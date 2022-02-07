import { Router } from "express";
import { db } from "../app";
import User from "../classes/User";
import multer from "multer";
const upload = multer({
  limits: {
  fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
  cb(new Error('Please upload an image.'))
  }
  cb(null, true)
  }
});
import axios from 'axios';
export const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  const users = await db.user.findMany({
    where: { created: { some: {} } },
    include: {
      created: true,
    }
  })

  res.send(users);
});
// Creacion de un user
usersRouter.post<{},{},{ name: string; username: string; password: string; email: string }>
  ("/", upload.single('avatar'), async (req, res) => {
    const { name, username, password, email } = req.body;
    let avatar: Buffer;
    if(req.file){
    avatar = req.file.buffer;
    }
    else return res.status(400).send({error: "Image is required"})

    const newUser = new User(name, username, password, avatar, email);

    try {
      const user = await db.user.upsert({
        where: { username: username },
        update: {},
        create: newUser,
      });

      return res.json(user);
    } catch (error) {
      console.log(error);
    }
});

// testing autores

usersRouter.get("/avatar",async (req, res, next) => {
  const admin = await db.user.findUnique({
    where: { username: "SuperAdmin" },
})
  if(admin){
    //Enviar el avatar como respuesta en formato jpeg
    res.setHeader("Content-Type", "image/jpeg");
    //@ts-ignore
    res.send(admin.avatar);
  }
  else{
    res.status(404).send("No se encontro el usuario");
  }
});
usersRouter.post<{},{}>("/authorsTest", async (req, res) => {

  let image = await axios.get("https://http2.mlstatic.com/D_NQ_NP_781075-MLA48271965969_112021-O.webp", {responseType: 'arraybuffer'});
  let buffer = Buffer.from(image.data, "utf-8");
  const userTest2 = new User("Aster Noriko", "AsterN", "pw123", buffer, "asternoriko@gmail.com");
  const userTest3 = new User("Daichi Matsuse", "DaichiM", "pass123", buffer, "daichimatsuse@gmail.com");
  const userTest4 = new User("Fumino Hayashi", "FuminoH", "pw0502", buffer, "fuminohayashi@gmail.com");
  const userTest5 = new User("Gato Aso", "GatoA", "pw1520", buffer, "gatoaso@gmail.com");
  const userTest6 = new User("Katsu Aki", "KatsuA", "pass32", buffer, "katsuaki@gmail.com");
  const userTest7 = new User("Kyo Shirodaira", "KyoS", "pw154", buffer, "kyoshirodaira@gmail.com");
  const userTest8 = new User("Mitsuba Takanashi", "MitsubaT", "pass052", buffer, "mitsubaTakanashi@gmail.com");

  const newUsers = [userTest2, userTest3, userTest4, userTest5, userTest6, userTest7, userTest8]
  try {
  const upsertManyPosts = newUsers.map(async (user) =>
    await db.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    })
  );

  const users =  await Promise.all(upsertManyPosts)

  return res.json(users);

  } catch (error) {
    console.log(error);
  }

  
});

// Ruta de coneccion author y manga.
usersRouter.post<{ idManga: string , username:string },{}>("/authorsTest/:username/:idManga", async (req, res) => {

  const { username, idManga } = req.params;

  const getUser = await db.user.update({
    where: {
      username: username
    },
    data: { 
      created: {
        connect: { id: Number(idManga)}
      }
    }
  })

  res.json(getUser);

})


usersRouter.get<{ username:string  }, {}>("/user/:username", async (req, res, next) => {
  const { username } = req.params;

  const User: any = await db.user.findUnique({
    where: { username: username },
    include: {
      created: true
    }
  });
  return res.send(User);
});


