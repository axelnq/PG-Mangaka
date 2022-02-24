import { Router } from "express";
import { usersRouter } from "./users";
import { mangasRouter } from "./mangas";
import { chaptersRouter } from "./chapters";
import { authRouter } from "./auth";
import { internalOrderRouter } from "./chapterBuy";
import { externalOrderRouter } from "./coins";
import { profileRouter } from "./profile";
import { commentsRouter } from "./comments";

export const routes = Router();

routes.use("/auth", authRouter);
routes.use("/users", usersRouter);
routes.use("/mangas", mangasRouter);
routes.use("/chapters", chaptersRouter);
routes.use("/profile", profileRouter)
routes.use("/buyChapter", internalOrderRouter);
routes.use("/coins", externalOrderRouter);
routes.use("/comments", commentsRouter);