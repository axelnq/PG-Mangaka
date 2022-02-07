import { Router } from "express";
import { db } from "../app";
import Chapter from "../classes/Chapter";
import multer from "multer";
const upload = multer({
  limits: {
  fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
  cb(new Error('Please upload an image.'))
  }
  cb(null, true)
  }
});

export const chaptersRouter = Router();


chaptersRouter.post<{},{}>("/upload", upload.fields([{name: 'portada', maxCount: 1}, {name: 'chapters', maxCount:20}]),async (req, res, next) => {
  try {
    if (req.files) {
    let imagesArray: Buffer[] = [];
    //@ts-ignore
    imagesArray.push(req.files['portada'][0].buffer);
    //@ts-ignore
    req.files['chapters'].forEach((element) => {
      imagesArray.push(element.buffer);
    });
    const chapter = new Chapter(req.body.title, imagesArray, Number(req.body.mangaId));
    console.log(chapter);
    //@ts-ignore
    await db.chapter.create({data: chapter});
    return res.send("Salio bien");  
  }} catch (error:any) {
    console.log(error);
    return res.status(500).send({error: error.message});
  }
  res.send("Algo salio mal");


})

chaptersRouter.get("/chapter/:id", async (req, res, next) => {
  //Obtiene y renderiza la imagen del capitulo

  try {
    const chapter = await db.chapter.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });
    if (chapter) {
      res.setHeader("Content-Type", "image/jpeg");

      //@ts-ignore
      res.send(chapter.images);
    } else {
      res.status(404).send("No se encontro el capitulo");
    }
  } catch (error:any) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});


// Creacion de un chapter
// chaptersRouter.post<{}, {}>("/", async (req, res, next) => {
//   const { title, images, mangaId } = req.body;
//   const chapter = new Chapter(title, images, mangaId);
  
//   try {
//     const newChapter = await db.chapter.create({ data: chapter });
//     res.status(201).json(newChapter);
//   } catch (error) {
//     next(new Error(`Chapter Post Error`));
//   }
// });

// //Traermos un capitulo particularl
// chaptersRouter.get<{ idChapter: string }, {}>(
//   "/:idChapter",
//   async (req, res, next) => {
//     const { idChapter } = req.params;

//     console.log(req.params);
//     const Manga: any = await db.chapter.findUnique({
//       where: { id: Number(idChapter) },
//     });
   
//     return res.send(Manga);
//   }
// );


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
