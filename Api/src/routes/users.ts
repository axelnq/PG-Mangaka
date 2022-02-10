import { Router } from "express";
import { db } from "../app";
import User  from "../classes/User";
export const usersRouter = Router();
import { Role } from '@prisma/client';


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
usersRouter.post<{}, {}, { name: string; username: string; password: string; email: string }>
  ("/", async (req, res) => {
    const { name, username, password, email } = req.body;

    const newUser = new User(name, username, password, email);
    
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

usersRouter.post<{}, {}>("/authorsTest", async (req, res) => {

  const userTest2 = new User("Aster Noriko", "AsterN", "pw123", "asternoriko@gmail.com");
  const userTest3 = new User("Daichi Matsuse", "DaichiM", "pass123", "daichimatsuse@gmail.com");
  const userTest4 = new User("Fumino Hayashi", "FuminoH", "pw0502", "fuminohayashi@gmail.com");
  const userTest5 = new User("Gato Aso", "GatoA", "pw1520", "gatoaso@gmail.com");
  const userTest6 = new User("Katsu Aki", "KatsuA", "pass32", "katsuaki@gmail.com");
  const userTest7 = new User("Kyo Shirodaira", "KyoS", "pw154", "kyoshirodaira@gmail.com");
  const userTest8 = new User("Mitsuba Takanashi", "MitsubaT", "pass052", "mitsubaTakanashi@gmail.com");

  const newUsers = [userTest2, userTest3, userTest4, userTest5, userTest6, userTest7, userTest8]
  try {
    const upsertManyPosts = newUsers.map(async (user) =>
      await db.user.upsert({
        where: { username: user.username },
        update: {},
        create: user,
      })
    );

    const users = await Promise.all(upsertManyPosts)

    return res.json(users);

  } catch (error) {
    console.log(error);
  }


});

// Ruta de coneccion author y manga.
usersRouter.post<{ idManga: string, username: string }, {}>("/authorsTest/:username/:idManga", async (req, res) => {

  const { username, idManga } = req.params;

  const getUser = await db.user.update({
    where: {
      username: username
    },
    data: {
      created: {
        connect: { id: Number(idManga) }
      }
    }
  })

  res.json(getUser);

})


usersRouter.get<{ username: string }, {}>("/user/:username", async (req, res, next) => {
  const { username } = req.params;

  const User: any = await db.user.findUnique({
    where: { username: username },
    include: {
      created: true
    }
  });
  return res.send(User);
});


usersRouter.post<{}, {}, { name: string; username: string; password: string; email: string,role:Role}>
  ("/superAdmin", async (req, res) => {
    // const { name, username, password, email,role} = req.body;

    const newUser = new User("Super Mangaka", "SuperMGK", "1234678", "supermangaka2022@gmail.com","SUPERADMIN");

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




