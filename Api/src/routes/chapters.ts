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

// Creacion de un chapter
chaptersRouter.post<{}, {}>("/", upload.fields([{name: 'portada', maxCount: 1}, {name: 'chapters', maxCount:20}]), async (req, res, next) => {
  const {title, mangaId} = req.body;
  let images: Buffer[] = [];
  if(req.files){
    //@ts-ignore
    if(req.files['portada'][0]){
      //@ts-ignore
      images.push(req.files['portada'][0].buffer);
    }
    //@ts-ignore
    if(req.files['chapters']){
      //@ts-ignore
      images = [...images, ...req.files['chapters'].map(chapter => chapter.buffer)];
    }
  }
  else{
    res.status(400).send('Images is required');
  }
  const newChapter = new Chapter(title, images, Number(mangaId));
  try {
    const chapter = await db.chapter.create({data: newChapter});
    return res.json(chapter);
  } catch (error:any) {
    console.log(error);
    res.status(400).send({error: error.message});
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
