import { Router } from "express";
import { usersRouter } from "./users";
import { mangasRouter } from "./mangas";
import { chaptersRouter } from "./chapters";

export const routes = Router();

routes.use("/users", usersRouter);
routes.use("/mangas", mangasRouter);
routes.use("/chapters", chaptersRouter);