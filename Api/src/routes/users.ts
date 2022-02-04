import { Router } from "express";
import { db } from "../app";
import User from "../classes/User";
export const usersRouter = Router();

// usersRouter.get("/", (req, res) => {
//   res.send({ message: "Soy un get de Users" });
// });

// Creacion de un user
usersRouter.post<{},{},{ name: string; username: string; password: string; email: string }>
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

usersRouter.get("/", async (req, res) => {
  const users = await db.user.findMany({
    where: { created: { some: {} } },
    include: {
      created: true,
    }
  })

  res.send(users);
});
