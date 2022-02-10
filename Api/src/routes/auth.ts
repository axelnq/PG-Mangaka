import { Router } from "express";
import passport from "passport";

export const authRouter = Router();

authRouter.get('/login', (req, res) => { 
  res.json({msg: "login failed"}); 
});

authRouter.get( "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get( "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("http://localhost:3000"); //front
  }
);

authRouter.post<{}, {}>("/local/login", (req, res, next) => {
  passport.authenticate("local",{ failureRedirect: '/login' }, (err, user, info) => {
    if(err) throw err;
    if(!user) return res.status(404).send("No user exists");
    else {
      req.logIn(user, err => {
        if (err) throw err;
        return res.redirect("http://localhost:3001/api/mangas/directory")
      })
    }
  })(req, res, next)
});

authRouter.get("/logout", (req, res) => {
  // console.log(req);
  if (req.user) {
    // console.log("logout");
    req.logout();
    res.send("Logout success");
  }
  else {
    // console.log("no logout");
    res.status(400).send({msg: "User not logged in"});
  }
});
