import bcrypt from "bcrypt";
import axios from "axios";
import { db } from "./app";
import User from "./classes/User";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport: any) {
  passport.serializeUser((user: any, done: any) => {
    // console.log("serialize: ", user.id)
    return done(null, user.id);
  });

  passport.deserializeUser((id: any, done: any) => {
    // const response = await db.user.findUnique({
    //   where: {
    //     id: id
    //   }
    // })
    // console.log("deserialize: ", id)
    return done(null, id);
  });

  passport.use(
    new localStrategy(async (username: string, password: string, done: any) => {
      const user = await db.user.findUnique({
        // Si se encontró un usuario retorna el objeto y si no "null"
        where: {
          username: username,
        },
      });
      if (!user) return done(null, false); // no hay error pero no se encontro un usuario
      if (user && user.password) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/api/auth/google/callback",
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        try {
          const user = await db.user.findUnique({
            where: {
              email: profile.emails[0].value,
            },
          });
          if (user) {
            // done(null, user);
            done(null, profile);
          } else {
            let photo = await axios.get(profile.photos[0].value, {
              responseType: "arraybuffer",
            });
            let buffer = Buffer.from(photo.data, "utf-8");
            const newUser = new User(
              profile.displayName,
              profile.id,
              buffer,
              profile.emails[0].value,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              true
            );
            const user = await db.user.create({
              //@ts-ignore
              data: newUser,
            });

            // done(null, newUser);
            console.log("google register: ", profile);
            done(null, profile);
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};
