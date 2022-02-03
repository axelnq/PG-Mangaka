import { Router } from "express";
import { db } from "../app";
import Chapter from "../classes/Chapter";
export const chaptersRouter = Router();


// Creacion de un chapter
chaptersRouter.post<{}, {}>("/", async (req, res, next) => {
  const { title, images, mangaId } = req.body;
  const chapter = new Chapter(title, images, mangaId);
  console.log(chapter);
  try {
    const newChapter = await db.chapter.create({data: chapter});
    res.status(201).json(newChapter);
  } catch (error) {
    next(new Error(`Chapter Post Error`));
  }
});
