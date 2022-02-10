import { Router } from "express";
import { usersRouter } from "./users";
import { mangasRouter } from "./mangas";
import { chaptersRouter } from "./chapters";
import { authRouter } from "./auth";
import { internalOrderRouter } from "./chapterBuy";
import { externalOrderRouter } from "./coins";

export const routes = Router();

routes.use("/users", usersRouter);
routes.use("/mangas", mangasRouter);
routes.use("/chapters", chaptersRouter);
routes.use("/auth", authRouter);
routes.use("/buyChapter", internalOrderRouter);
routes.use("/Coins", externalOrderRouter);
