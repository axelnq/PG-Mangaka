import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../app";
import multer from "multer";
import { isAuthenticated } from "./auth";
const upload = multer({
  limits: {
    fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|jfif)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(null, true);
  },
});
export const profileRouter = Router();

//
//
// Rutas Get
//
//

// Obtener el perfil del usuario, todos los datos excluyendo aquellos inactivos
profileRouter.get("/", isAuthenticated, async (req, res, next) => {
  //@ts-ignore
  const { name, username, avatar, email, role, about, coins, creatorMode, library, wishList, favorites, created, active} = req.user;
  console.log(req.user);
  if (active) {
    let profile = {
      name: name,
      username: username,
      avatar: avatar,
      email: email,
      role: role,
      about: about,
      coins: coins,
      creatorMode: creatorMode,
      library: library,
      wishlist: wishList,
      favorites: favorites,
      rating:
        created.reduce((acc: any, curr: any) => {
          return acc + curr.rating;
        }, 0) / created.length,
    };
    res.json({ profile: profile, mangasCreated: created });
  } else {
    res.status(400).json({
      error:
        "This user does not exist, if you think it is an error, contact support",
    });
  }
});

// Obtiene todos los mangas creados por el usuario, junto a sus capitulos y el total de ellos para cada manga
profileRouter.get("/mangas", isAuthenticated, async (req, res, next) => {
  try{
  //@ts-ignore
  const {id} = req.user;
  const mangasCreated = await db.manga.findMany({
    where: {
      authorId: id,
      active: true,
    },
    select: {
      id: true,
      title: true,
      image: true,
      createdAt: true,
      uptadedAt: true,
      genre: true,
      rating: true,
      chapters: {
        where: {
          active: true,
        },
        select: {
          id: true,
          title: true,
          points: true,
          coverImage: true,
          images: true,
        },
      },
    },
  });
  console.log("mis mangas", mangasCreated);
  //@ts-ignore
  if(mangasCreated.length === 0){
    return res.json({msg: "No hay Mangas aún"})
  }else{
  mangasCreated.forEach((manga: any) => {
    manga.chapters.forEach((chapter: any) => {
      chapter.totalPages = chapter.images.length;
    });
  });
  res.json({ mangasCreated: mangasCreated });
  }
} catch (error) {
  console.log(error);
  res.status(500).json({
    error:
      "Something went wrong, if you think it is an error, contact support",
  });
}
})

// obtiene los favoritos del usuario
profileRouter.get("/favorites", isAuthenticated, async (req, res, next) => {
  //@ts-ignore
  const { favorites } = req.user;
  try{
    let mangas = await db.manga.findMany({
      where: { id: { in: favorites } },
      select: {
        id: true,
        title: true,
        image: true,
        author: {
          select: {
            name: true,
          }
        },
        chapters: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          }
        }
      }
    });
    res.json({ data: mangas, totalFavorites: favorites.length });
  } catch (err:any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// Obtiene la bibloteca del usuario
profileRouter.get("/library", isAuthenticated, async (req, res, next) => {
  //@ts-ignore
  const { library } = req.user;
  try{
    let mangas = await db.manga.findMany({
      where: { id: { in: library } },
      select: {
        id: true,
        title: true,
        image: true,
        author: {
          select: {
            name: true,
          }
        },
        chapters: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          }
        }
      }
    });
    res.json({ data: mangas, totalLibrary: mangas.length });
  } catch (err:any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});
// Obtiene la Wishlist del usuario
profileRouter.get("/wishlist", isAuthenticated, async (req, res, next) => {
  //@ts-ignore
  const { wishList } = req.user;
  try{
    let mangas = await db.manga.findMany({
      where: { id: { in: wishList } },
      select: {
        id: true,
        title: true,
        image: true,
        author: {
          select: {
            name: true,
          }
        },
        chapters: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          }
        }
      }
    });
    res.json({ data: mangas, totalWishlist: mangas.length });
  } catch (err:any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// Ruta Get avatar
profileRouter.get("/avatar", isAuthenticated, async (req, res, next) => {
  //@ts-ignore
  res.send({ avatar: req.user.avatar });
});
// Ruta get coins
profileRouter.get("/coins", isAuthenticated, async(req, res, next) => {
  //@ts-ignore
  const { id } = req.user;
  try{
    let coins = await db.user.findUnique({
      where: { id: id },
      select: { coins: true }
    });
    console.log(coins)
    if(coins) res.json({ coins: coins.coins });
    else res.status(400).json({ error: "An error has ocurred" });
  } catch (err:any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
})

//
//
// Rutas Put
//
//

// Otorga el modo creador al usuario
profileRouter.put("/creator", isAuthenticated, async (req, res, next) => {
  //@ts-ignore
  const { id } = req.user;
  //@ts-ignore
  if(req.user.creatorMode) {
    return res.status(400).json({ error: "You already have creator mode" });
  } 
  try{
    let user = await db.user.update({
      where: { id: id },
      data: { creatorMode: true }
    });
  res.status(200).send({ message: "You have been granted creator mode"}); 
  } catch (err:any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// Actualiza el nombre del usuario
profileRouter.put("/updateName", isAuthenticated, async (req, res) => {
  //@ts-ignore
  const { username } = req.user;
  const { newName } = req.body;
  try {
    await db.user.update({
      where: {
        username: username,
      },
      data: {
        name: newName,
      },
    });
    res.send({ message: "Name updated" });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// Actualiza el username
profileRouter.put("/updateUsername", isAuthenticated, async (req, res) => {
  //@ts-ignore
  const { id } = req.user;
  const { newUsername, password } = req.body;
  try {
    if (password) {
      //@ts-ignore
      if (bcrypt.compareSync(password, req.user.password)) {
        await db.user.update({
          where: {
            id: id,
          },
          data: {
            username: newUsername,
          },
        });
        return res.send({ message: "Username updated" });
      } else {
        return res.status(401).send({ message: "Password is incorrect" });
      }
      //@ts-ignore
    } else if (req.user.googleId) {
      await db.user.update({
        where: {
          id: id,
        },
        data: {
          username: newUsername,
        },
      });
      return res.send({ message: "Username updated" });
    } else {
      return res.status(401).send({ message: "Password is incorrect" });
    }
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// Actualiza el email
profileRouter.put("/updateEmail", isAuthenticated, async (req, res) => {
  //@ts-ignore
  const { id } = req.user;
  const { newEmail, password } = req.body;
  try {
    if (password) {
      //@ts-ignore
      if (bcrypt.compareSync(password, req.user.password)) {
        await db.user.update({
          where: {
            id: id,
          },
          data: {
            email: newEmail,
          },
        });
        res.send({ message: "Email updated" });
      } else {
        res.status(401).send({ message: "Password is incorrect" });
      }
    } else {
      //@ts-ignore
      if (req.user.googleId) {
        res.status(401).send({ message: "You can't change your email" });
      } else {
        res.status(401).send({ message: "Password is required" });
      }
    }
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// Actualiza el password
profileRouter.put("/updatePassword", isAuthenticated, async (req, res) => {
  //@ts-ignore
  const { id } = req.user;
  let { password, newPassword } = req.body;
  try {
     if (password) {
       //@ts-ignore
      if (bcrypt.compareSync(password, req.user.password)) {
           await db.user.update({
             where: {
               id: id,
             },
             data: {
               password: bcrypt.hashSync(newPassword, 10),
             },
           });
           res.send({ message: "Password updated" });
         } else {
           res.status(401).send({ message: "Password is incorrect" });
         }
       } else {
         //@ts-ignore
         if (req.user.googleId) {
           res.status(401).send({ message: "You can't change your password" });
         }
         res.status(401).send({ message: "Password is required" });
       }
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// Actualiza el About
profileRouter.put("/updateAbout", isAuthenticated, async (req, res) => {
  //@ts-ignore
  const { id } = req.user;
  let { about } = req.body;
  if (!about) {
    return res.status(400).send({ message: "About is required" });
  }
  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        about: about,
      },
    });
    res.send({ message: "About updated" });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// Actualiza Avatar
profileRouter.put("/updateAvatar", isAuthenticated, upload.single("avatar"), async (req, res) => {
    //@ts-ignore
    const { id } = req.user;
    let avatar: Buffer;
    if (!req.file) {
      return res.status(400).send("Image is required");
    }
    avatar = req.file.buffer;
    try {
      await db.user.update({
        where: { id: id },
        //@ts-ignore
        data: { avatar: avatar },
      });

      return res.status(200).send({ message: "Avatar updated" });
    } catch (error: any) {
      return res.status(400).send(error);
    }
  }
);
