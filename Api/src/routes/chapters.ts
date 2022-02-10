import { Router } from "express";
import { db } from "../app";
import Chapter from "../classes/Chapter";
import multer from "multer";
const upload = multer({
  limits: {
    fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(null, true);
  },
});

export const chaptersRouter = Router();

// Creacion de un chapter
chaptersRouter.post<{}, {}>(
  "/",
  upload.fields([
    { name: "portada", maxCount: 1 },
    { name: "chapters", maxCount: 20 },
  ]),
  async (req, res, next) => {
    const { title, mangaId, price } = req.body;
    let images: Buffer[] = [];
    let cover: Buffer;
    if (req.files) {
      //@ts-ignore
      images = req.files.chapters.map((file) => file.buffer);
      //@ts-ignore
      cover = req.files.portada[0].buffer;
    } else {
      return res.status(400).send("Images is required");
    }
    const newChapter = new Chapter(
      title,
      images,
      cover,
      Number(price),
      Number(mangaId)
    );
    try {
      //@ts-ignore
      const chapter = await db.chapter.create({ data: newChapter });
      return res.json(chapter);
    } catch (error: any) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  }
);

//Actualizar las imagenes de un chapter
chaptersRouter.put(
  "/chapter/updateImages/:idChapter",
  upload.array("chapters", 20),
  async (req, res, next) => {
    const { idChapter } = req.params;
    let images: Buffer[] = [];
    if (req.files) {
      //@ts-ignore
      images = req.files.map((file) => file.buffer);
    } else {
      return res.status(400).send("Images is required");
    }
    try {
      const chapter = await db.chapter.update({
        where: { id: Number(idChapter) },
        //@ts-ignore
        data: { images: images },
      });
      return res.status(204).send();
    } catch (error: any) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  }
);

//Actualizacion de la portada de un chapter
chaptersRouter.put(
  "/chapter/updateCover/:idChapter",
  upload.single("cover"),
  async (req, res, next) => {
    const { idChapter } = req.params;
    let coverImage: Buffer;
    if (req.file) {
      coverImage = req.file.buffer;
    } else {
      return res.status(400).send({ message: "Cover is required" });
    }
    try {
      const chapter = await db.chapter.update({
        where: { id: Number(idChapter) },
        //@ts-ignore
        data: { coverImage: coverImage },
      });
      return res.status(204).send();
    } catch (error: any) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  }
);

//Ruta que intercambia las posiciones de 2 imagenes de un chapter
chaptersRouter.put("/chapter/swapImages/:idChapter", async (req, res, next) => {
  const { idChapter } = req.params;
  const { index1, index2 } = req.body;
  try {
    let chapterImages = await db.chapter.findUnique({
      where: { id: Number(idChapter) },
      select: {
        images: true,
      },
    });
    if (!chapterImages) {
      return res.status(404).send({ message: "Chapter not found" });
    }
    let images = chapterImages.images;
    [images[index1], images[index2]] = [images[index2], images[index1]];
    await db.chapter.update({
      where: { id: Number(idChapter) },
      data: { images: images },
    });
    return res.status(204).send();
  } catch (error: any) {
    console.log(error);
    res.status(400).send({ error: error.message });
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

//Ruta Test para ver las imagenes de un capitulo
chaptersRouter.get(
  "/chapter/image/:idChapter/:imageIndex",
  async (req, res, next) => {
    const { idChapter, imageIndex } = req.params;
    const chapter: any = await db.chapter.findUnique({
      where: { id: Number(idChapter) },
    });
    res.set("Content-Type", "image/jpeg");
    res.send(chapter.images[imageIndex]);
  }
);

//Ruta Test para ver la imagen de la portada
chaptersRouter.get("/chapter/cover/:idChapter", async (req, res, next) => {
  const { idChapter } = req.params;
  const chapter: any = await db.chapter.findUnique({
    where: { id: Number(idChapter) },
  });
  res.set("Content-Type", "image/jpeg");
  res.send(chapter.coverImage);
});

// chaptersRouter.post<{}, {}>("/testChapters", async (req, res, next) => {
//   const { title, images, mangaId } = req.body;
//   try {
//   const popularMangas = await db.manga.findMany({})

//   popularMangas.forEach(async manga => {
//     let chapter = new Chapter(`${manga.title} chapter 1`, [`The beginning of ${manga.title}`], manga.id);
//     let chapter2 = new Chapter(`${manga.title} chapter 2`, [`The end of ${manga.title}`], manga.id);

//     let newChapters = await db.chapter.createMany({
//       data: [chapter,chapter2]
//     })
//   })

//     res.status(201).json({message: 'Chapters Created'});
//   } catch (error) {
//     next(new Error(`Chapter Post Error`));
//   }
// });
