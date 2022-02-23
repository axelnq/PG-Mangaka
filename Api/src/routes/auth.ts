import { NextFunction, Router } from "express";
import passport from "passport";
import { db } from "../app";
const { 
  SERVER_URL
} = process.env || 3001

export const authRouter = Router();
export async function isAuthenticated(req: any , res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
};

authRouter.get("/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get("/google/callback",
  passport.authenticate("google", { successRedirect:`${SERVER_URL}`, failureRedirect: "/login" })
);

authRouter.get("/google/response", async (req: any, res: any) => {  
  console.log("google response: ", req.user);
  if( req.user ) {
    let user = await db.user.findUnique({
      where: {
        id: req.user.id,
      }
    })
    return res.json(user)
  }
  res.send({msg: "usuario no logueado"})
});

authRouter.post<{}, {}>("/local/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { successRedirect: `${SERVER_URL}`, failureRedirect: "/login" },
    (err, user, info) => {
      if (err) throw err;
      if (!user) return res.status(404).send("No user exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          return res.send(user) 
          //res.send("successfully authenticated");
          //res.redirect("http://localhost:3000/")
        });
      }
    }
  )(req, res, next);
});

authRouter.get("/logout", (req, res) => {

  if (req.user) {
   
    req.logout();
    res.send("Logout success");
  } else {

    res.status(400).send({ msg: "User not logged in" });
  }
});
