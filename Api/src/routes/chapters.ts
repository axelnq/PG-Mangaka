import { Router } from "express";
import { db } from "../app";
import Chapter from "../classes/Chapter";
import { isAuthenticated } from "./auth";
import multer from "multer";
const upload = multer({
  limits: {
    fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|jfif)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(null, true);
  },
});

export const chaptersRouter = Router();

// Creacion de un chapter
chaptersRouter.post<{}, {}>(
  "/",
  // isAuthenticated,
  upload.fields([
    { name: "portada", maxCount: 1 },
    { name: "chapters", maxCount: 100 },
  ]),
  async (req, res, next) => {
    const { title, mangaId, price } = req.body;
    //@ts-ignore
    // const Authorship = req.user.created.find((c) => c.id === Number(mangaId));
    // if (!Authorship) {
    //   return res.status(400).send({ msg: "You not have permission to create a chapter in this manga" });
    // }
    //@ts-ignore
    let images: Buffer[] = [];
    let cover: Buffer;
    if (req.files) {
      try {
        //@ts-ignore
        images = req.files.chapters.map((file) => file.buffer);
        //@ts-ignore
        cover = req.files.portada[0].buffer;
      } catch (e) {
        console.log(e);
        return res.status(400).send({ msg: "Error uploading images" });
      }
    } else {
      return res.status(400).send({ msg: "Images is required" });
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
      return res.send({ data: chapter });
    } catch (error: any) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  }
);

//Actualizar las imagenes de un chapter
chaptersRouter.put(
  "/chapter/updateImages",
  isAuthenticated,
  upload.array("chapters", 100),
  async (req, res, next) => {
    const { chapterId, mangaId } = req.body;
    //@ts-ignore
    const Authorship = req.user.created.find((c) => c.id === Number(mangaId));
    if (!Authorship) {
      return res.status(400).send({ msg: "You not have permission to update a chapter in this manga" });
    }
    let images: Buffer[] = [];
    if (req.files) {
      try {
        //@ts-ignore
        images = req.files.map((file) => file.buffer);
      } catch (e) {
        console.log(e);
        return res.status(400).send({ msg: "Error uploading images" });
      }
    } else {
      return res.status(400).send({ msg: "Images is required" });
    }
    try {
      const chapter = await db.chapter.update({
        where: { id: Number(chapterId) },
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
  "/chapter/updateCover",
  isAuthenticated,
  upload.single("cover"),
  async (req, res, next) => {
    const { chapterId, mangaId } = req.body;
    //@ts-ignore
    const Authorship = req.user.created.find((c) => c.id === Number(mangaId));
    if (!Authorship) {
      return res.status(400).send({ msg: "You not have permission to create a chapter in this manga" });
    }
    let coverImage: Buffer;
    if (req.file) {
      coverImage = req.file.buffer;
    } else {
      return res.status(400).send({ message: "Cover is required" });
    }
    try {
      const chapter = await db.chapter.update({
        where: { id: Number(chapterId) },
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
chaptersRouter.put("/chapter/swapImages", isAuthenticated, async (req, res, next) => {
  const { chapterId, mangaId } = req.body;
  //@ts-ignore
  const Authorship = req.user.created.find((c) => c.id === Number(mangaId));
  if (!Authorship) {
    return res.status(400).send({ msg: "You not have permission to create a chapter in this manga" });
  }
  const { index1, index2 } = req.body;
  try {
    let chapterImages = await db.chapter.findUnique({
      where: { id: Number(chapterId) },
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
      where: { id: Number(chapterId) },
      data: { images: images },
    });
    return res.status(204).send();
  } catch (error: any) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

//Traermos un capitulo particular
chaptersRouter.get<{ idChapter: string }, {}>(
  "/chapter/getchapter/:idChapter",
  async (req, res, next) => {
    const { idChapter } = req.params;

    console.log(req.params);
    const Chapter: any = await db.chapter.findUnique({
      where: { id: Number(idChapter) },
    });

    return res.send({ data: Chapter, totalPages: Chapter.images.length });
  }
);

//Ruta para traerse todas las paginas del chapter
chaptersRouter.get(
  "/chapter/images/:idChapter",
  async (req, res, next) => {
    const { idChapter } = req.params;
    const Chapter: any = await db.chapter.findUnique({
      where: { id: Number(idChapter) },
    });
    return res.send({ data: Chapter.images });
  });

//Ruta para ver la imagen de la portada
chaptersRouter.get("/chapter/cover/:idChapter", async (req, res, next) => {
  const { idChapter } = req.params;
  const Chapter: any = await db.chapter.findUnique({
    where: { id: Number(idChapter) },
  });
  return res.send({ data: Chapter.coverImage });
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

// Votación de un capitulo
chaptersRouter.put<{ idChapter: string }, {}>("/chapter/vote/:idChapter", isAuthenticated, async (req, res) => {
  const { idChapter } = req.params;
  let { points } = req.body;
  const user = req.user;
  //@ts-ignore
  const idUser = user.id;

  if (!(points >= 1 && points <= 5)) return res.status(400).send({ msg: "Points most be between 1 and 5" })

  try {

    let chapter = await db.chapter.findUnique({  // Retorna un objeto con la propiedad usersId
      where: { id: Number(idChapter) },
      select: { id: true, usersId: true }
    });

    if (!chapter) return res.status(400).send({ msg: "Invalid chapter ID" })

    if (chapter.usersId.includes(idUser)) return res.send({ msg: "the user already voted" });

    let newUsers = [...chapter.usersId, idUser];

    let updatePoints = await db.chapter.update({
      where: {
        id: Number(idChapter)
      },
      data: {
        points: {
          increment: Number(points)
        },
        usersId: newUsers
      }
    });

    res.send({ msg: "Score made" })

  } catch (err: any) {
    console.log("Vote chapter: ", err)
    res.status(400).send({ error: err.message })
  }
});

// Obtener puntaje de un capitulo
chaptersRouter.get<{ idChapter: string }, {}>('/chapter/rating/:idChapter', async (req, res) => {
  let { idChapter } = req.params;

  try {
    let chapter = await db.chapter.findUnique({
      where: {
        id: Number(idChapter)
      },
      select: {
        points: true,
        usersId: true
      }
    })

    if (!chapter) return res.status(400).send({ msg: "Invalid chapter ID" });

    let ratingChapter = Number((chapter.points / chapter.usersId.length).toFixed(2))

    res.send({ data: ratingChapter })

  } catch (err: any) {
    console.log("Points: ", err);
    res.status(400).send({ error: err.message })
  }
});