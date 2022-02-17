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

// Ruta Get avatar
profileRouter.get("/avatar", isAuthenticated, async (req, res, next) => {
  //@ts-ignore
  res.send({ avatar: req.user.avatar });
});

//
//
// Rutas Put
//
//

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
      res.send({ message: "You can't change your username with google" });
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
