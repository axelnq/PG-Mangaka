import { Router } from "express";
import { db } from "../app";
import Chapter from "../classes/Chapter";
export const chaptersRouter = Router();
import Manga from "../classes/Manga";

// Creacion de un chapter
chaptersRouter.post<{}, {}>("/", async (req, res, next) => {
  const { title, images, mangaId } = req.body;
  const chapter = new Chapter(title, images, mangaId);
  
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
   
    return res.send(Manga);
  }
);


chaptersRouter.post<{}, {}>("/testChapters", async (req, res, next) => {
  const { title, images, mangaId } = req.body;
  try {
  const popularMangas = await db.manga.findMany({})

  popularMangas.forEach(async manga => {
    let chapter = new Chapter(`${manga.title} chapter 1`, [`The beginning of ${manga.title}`], manga.id);
    let chapter2 = new Chapter(`${manga.title} chapter 2`, [`The end of ${manga.title}`], manga.id);
   
    let newChapters = await db.chapter.createMany({
      data: [chapter,chapter2]
    })
  })
    
    res.status(201).json({message: 'Chapters Created'});
  } catch (error) {
    next(new Error(`Chapter Post Error`));
  }
});
