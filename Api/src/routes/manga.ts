import { Router, Request } from "express";

import { db } from "../app";
// import Manga from "../classes/Manga";
export const mangaRouter = Router();

mangaRouter.get<{ id: string }, {}>("/:id", async (req, res, next) => {
  const { id } = req.params;

  console.log(req.params);
  const Manga: any = await db.manga.findUnique({
    where: { id: Number(id) },
  });
  return res.send(Manga);
});
