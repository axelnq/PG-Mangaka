import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../app";
import User from "../classes/User";
import fs from "fs";
import multer from "multer";
import { Role } from '@prisma/client';
const upload = multer({
  limits: {
    fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(null, true);
  },
});
import axios from "axios";
export const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  const users = await db.user.findMany({
    /*
    where: { created: { some: {} } },
    include: {
      created: true,
    },
    */
  });

  res.send(users);
});
// Creacion de un user
usersRouter.post<
  {},
  {},
  { name: string; username: string; password: string; email: string }
>("/register", upload.single("avatar"), async (req, res) => {
  const { name, username, password, email } = req.body;

  const regPass = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/
  );
  const regEmail = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (!regPass.test(password))
    return res.status(400).json({ error: "Invalid password" });

  if (!regEmail.test(email))
    return res.status(400).json({ error: "Invalid email address" });

  let hashedPassword = await bcrypt.hash(password, 10);
  let avatar: Buffer;

  if (req.file) {
    avatar = req.file.buffer;
  } else {
    avatar = fs.readFileSync("./assets/default.png");
  }

  const newUser = new User(name, username, avatar, email, hashedPassword);

  try {
    const user = await db.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (user) {
      if (user.username === username) {
        return res.status(400).json({ error: "This username already exist" });
      } else {
        return res.status(400).json({ error: "This email already exist" });
      }
    }

    await db.user.create({
      //@ts-ignore
      data: newUser,
    });

    return res.status(201).json({ msg: "Successefully user created" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "An error creating a user" });
  }
});

// testing autores
usersRouter.post<{}, {}>("/authorsTest", async (req, res) => {
  let image = await axios.get(
    "https://http2.mlstatic.com/D_NQ_NP_781075-MLA48271965969_112021-O.webp",
    { responseType: "arraybuffer" }
  );
  let buffer = Buffer.from(image.data, "utf-8");
  const userTest2 = new User(
    "Aster Noriko",
    "AsterN",
    buffer,
    "asternoriko@gmail.com"
  );
  const userTest3 = new User(
    "Daichi Matsuse",
    "DaichiM",
    buffer,
    "daichimatsuse@gmail.com"
  );
  const userTest4 = new User(
    "Fumino Hayashi",
    "FuminoH",
    buffer,
    "fuminohayashi@gmail.com"
  );
  const userTest5 = new User("Gato Aso", "GatoA", buffer, "gatoaso@gmail.com");
  const userTest6 = new User(
    "Katsu Aki",
    "KatsuA",
    buffer,
    "katsuaki@gmail.com"
  );
  const userTest7 = new User(
    "Kyo Shirodaira",
    "KyoS",
    buffer,
    "kyoshirodaira@gmail.com"
  );
  const userTest8 = new User(
    "Mitsuba Takanashi",
    "MitsubaT",
    buffer,
    "mitsubaTakanashi@gmail.com"
  );

  const newUsers = [
    userTest2,
    userTest3,
    userTest4,
    userTest5,
    userTest6,
    userTest7,
    userTest8,
  ];
  try {
    const upsertManyPosts = newUsers.map(
      async (user) =>
        await db.user.upsert({
          where: { username: user.username },
          update: {},
          //@ts-ignore
          create: user,
        })
    );

    const users = await Promise.all(upsertManyPosts);

    return res.json(users);
  } catch (error) {
    console.log(error);
  }
});

// Ruta de coneccion author y manga.
usersRouter.post<{ idManga: string; username: string }, {}>(
  "/authorsTest/:username/:idManga",
  async (req, res) => {
    const { username, idManga } = req.params;

    const getUser = await db.user.update({
      where: {
        username: username,
      },
      data: {
        created: {
          connect: { id: Number(idManga) },
        },
      },
    });

    res.json(getUser);
  }
);
// Perfil de usuario
usersRouter.get<{ username: string }, {}>(
  "/user/:username",
  async (req, res, next) => {
    const { username } = req.params;

    const User: any = await db.user.findUnique({
      where: { username: username },
      include: {
        created: true,
      },
    });
    return res.send(User);
  }
);

usersRouter.get("/currentUser", (req, res, next) => {
  // console.log(req)
  // console.log(req.user);
  if(!req.user) {
    return res.json({msg: 'No hay un usuario logueado'})
  }
  res.json(req.user);
});

usersRouter.post<{}, {}, { name: string; username: string; password: string; email: string,role:Role}>
  ("/superAdmin", async (req, res) => {
    // const { name, username, password, email,role} = req.body;
    let image = await axios.get(
      "https://http2.mlstatic.com/D_NQ_NP_781075-MLA48271965969_112021-O.webp",
      { responseType: "arraybuffer" }
    );
    let buffer = Buffer.from(image.data, "utf-8");
    const newUser = new User("Super Mangaka", "SuperMGK", buffer,"SUPERADMIN");

    try {
      let superAdmin = await db.user.findUnique({
        where: { username: newUser.username}
      })

      if(!superAdmin) {
        superAdmin = await db.user.create({
          data: newUser,
        });
  
      }
     
      return res.json(superAdmin);
    } catch (error) {
      console.log(error);
    }
  });

  usersRouter.put<{ admin: boolean, username: string }, {}>("/user/setAdmin/:username", async (req, res, next) => {
    const { username } = req.params;
   
    try {
     
      const user = await db.user.findUnique({
        where: { username: username }
      })
      if (!user) return res.send({ message: "User not found" })
  
      const upsertUser = await db.user.update({
        where: {
          username: username,
        },
        data: {
          role: user.role === 'USER' ? 'ADMIN' : 'USER'
        }
      });
      return res.send(upsertUser);
      
    } catch (error) {
      return res.sendStatus(404).json({ message: error });
    }
  
  });


  usersRouter.put<{ admin: boolean, username: string }, {}>("/user/setActive/:username", async (req, res, next) => {
    const { username } = req.params;
   
    try {
      
      const user = await db.user.findUnique({
        where: { username: username },
        include: { created:true}
      })
      if (!user) return res.send({ message: "User not found" })
      
      user.created.forEach(manga => {
          manga.active = true;
      })
      user.created.forEach(manga => console.log(manga.active));
  
      const upsertUser = await db.user.update({
        where: {
          username: username,
        },
        data: {
          active: user?.active === true ? false : true,
        }
      });
      return res.send(upsertUser);
      
    } catch (error) {
      return res.sendStatus(404).json({ message: error });
    }
  
  });
  