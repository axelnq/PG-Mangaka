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
    const newChapter = await db.chapter.create({ data: chapter });
    res.status(201).json(newChapter);
  } catch (error) {
    next(new Error(`Chapter Post Error`));
  }
});

//Traermos un capitulo particularl
chaptersRouter.get<{ idChapter: string }, {}>(
  "/:idChapter",
  async (req, res, next) => {
    const { idChapter } = req.params;

    console.log(req.params);
    const Manga: any = await db.chapter.findUnique({
      where: { id: Number(idChapter) },
    });
    console.log(Manga);
    return res.send(Manga);
  }
);
