import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../app";
import User from "../classes/User";
import multer from "multer";
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

// Todas las rutas de este archivo deben actualizarse para recibir el usuario autenticado
// Apenas funcione el serialize.

//
//
// Rutas Get
//
//

// Obtener el perfil del usuario, todos los datos excluyendo aquellos inactivos
profileRouter.get("/", async (req, res) => {
  const userJSON = JSON.parse(req.user as string);
  const user = await db.user.findUnique({
    where: {
      username: userJSON.username,
    },
    include: {
      created: true,
    },
  });

  if (user) {
    if (user.active) {
      let profile = {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        role: user.role,
        about: user.about,
        coins: user.coins,
        creatorMode: user.creatorMode,
        library: user.library,
        wishlist: user.wishList,
        favorites: user.favorites,
        rating: user.created.reduce((acc, curr) => {return acc + curr.rating}, 0) / user.created.length,
      };
      res.json({ profile: profile, mangasCreated: user.created });
    } else {
      res
        .status(400)
        .json({
          error:
            "This user does not exist, if you think it is an error, contact support",
        });
    }
  } else {
    res
      .status(400)
      .send({
        msg: "An error has ocurred, if the problem persists contact support.",
      });
  }
});

// Ruta Get avatar
profileRouter.get("/avatar/:username", async (req, res, next) => {
  let { username } = req.params;
  if (!username) {
    return res.status(400).send({ message: "Username is required" });
  }
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });
  if (user) {
    res.send(user.avatar);
  } else {
    res.status(404).send("User not found");
  }
});

//
//
// Rutas Put
//
//

// Actualiza el nombre del usuario
profileRouter.put("/updateName/:username", async (req, res) => {
  let { username } = req.params;
  let { name } = req.body;
  if (!username) {
    return res.status(400).send({ message: "Username is required" });
  }
  if (!name) {
    return res.status(400).send({ message: "Name is required" });
  }
  try {
    await db.user.update({
      where: {
        username: username,
      },
      data: {
        name: name,
      },
    });
    res.send({ message: "Name updated" });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// Actualiza el username
profileRouter.put("/updateUsername/:username", async (req, res) => {
  let { username } = req.params;
  let { password } = req.body;
  let { newUsername } = req.body;
  if (!username) {
    return res.status(400).send({ message: "Username is required" });
  }
  if (!newUsername) {
    return res.status(400).send({ message: "New username is required" });
  }
  try {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (user) {
      if (password && user.password) {
        if (bcrypt.compareSync(password, user.password)) {
          await db.user.update({
            where: {
              username: username,
            },
            data: {
              username: newUsername,
            },
          });
          res.send({ message: "Username updated" });
        } else {
          res.status(401).send({ message: "Password is incorrect" });
        }
      } else {
        await db.user.update({
          where: {
            username: username,
          },
          data: {
            username: newUsername,
          },
        });
        res.send({ message: "Username updated" });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// Actualiza el email
profileRouter.put("/updateEmail/:username", async (req, res) => {
  let { username } = req.params;
  let { password } = req.body;
  let { newEmail } = req.body;
  if (!username) {
    return res.status(400).send({ message: "Username is required" });
  }
  if (!newEmail) {
    return res.status(400).send({ message: "New email is required" });
  }
  try {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (user) {
      if (password && user.password) {
        if (bcrypt.compareSync(password, user.password)) {
          await db.user.update({
            where: {
              username: username,
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
          if (user.googleId) {
            res.status(401).send({ message: "You can't change your email" });
          } else {
            res.status(401).send({ message: "Password is required" });
          }
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// Actualiza el password
profileRouter.put("/updatePassword/:username", async (req, res) => {
  let { username } = req.params;
  let { password } = req.body;
  let { newPassword } = req.body;
  if (!username) {
    return res.status(400).send({ message: "Username is required" });
  }
  if (!newPassword) {
    return res.status(400).send({ message: "New password is required" });
  }
  try {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (user) {
      if (password && user.password) {
        if (bcrypt.compareSync(password, user.password)) {
          await db.user.update({
            where: {
              username: username,
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
        if (user.googleId) {
          res.status(401).send({ message: "You can't change your password" });
        }
        res.status(401).send({ message: "Password is required" });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// Actualiza el About
profileRouter.put("/updateAbout/:username", async (req, res) => {
  let { username } = req.params;
  let { about } = req.body;
  if (!username) {
    return res.status(400).send({ message: "Username is required" });
  }
  if (!about) {
    return res.status(400).send({ message: "About is required" });
  }
  try {
    await db.user.update({
      where: {
        username: username,
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
profileRouter.put(
  "/user/updateAvatar/:username",
  upload.single("avatar"),
  async (req, res) => {
    let username = req.params.username;
    let avatar: Buffer;
    if (!req.file) {
      return res.status(400).send("Image is required");
    }
    avatar = req.file.buffer;
    try {
      await db.user.update({
        where: { username: username },
        //@ts-ignore
        data: { avatar: avatar },
      });

      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).send(error);
    }
  }
);
