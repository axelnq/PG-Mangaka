import { Router } from "express";
import { db } from "../app";
import Manga from "../classes/Manga";
import User from "../classes/User";
export const mangasRouter = Router();
import axios from "axios";
import { sort } from "../utils/sorts";
import { paginatedByAuthor, paginated } from "../utils/paginated";
import multer from "multer";
import { isAuthenticated } from "./auth";
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

// obtiene todos los mangas de la DB y podes recibir por query , el orden (ASC o DESC) y el tags que seria por ejemplo , "tittle" , "chapters" , "rating"
mangasRouter.get<{}, {}>("/directory", async (req, res, next) => {
  let { page, order, tags } = req.query;
  if (!page) page = "1";
  let filter: string = req.query.filter as string; //Page number > 0, order emun [asc, desc],
  // tags enum [title, chapter, rating, createdAt, updatedAt]
  // filter string "Action-Adventure"
  let filterArray: string[] = [];
  if (filter) filterArray = filter.split("-");
  let mangasResponse: [Manga[], number, number];
  try {
    mangasResponse = await paginated(
      Number(page),
      order as string,
      tags as string,
      filterArray
    );
  } catch (e: any) {
    return res.status(404).send({ message: e.message });
  }

  res.json({
    data: mangasResponse[0],
    total: mangasResponse[1],
    totalMangas: mangasResponse[2],
  });
});

// Obtener los 10 mangas mas populares por rating
mangasRouter.get<{}, {}>("/popularMangas", async (req, res) => {
  try {
    const popularMangas = await db.manga.findMany({
      where: {
        active:true,
        rating: {
          gte: 8,
        },
      },
      orderBy: {
        rating: "desc",
      },
      take: 10,
    });

    return res.json({ data: popularMangas });
  } catch (err) {
    console.log(err);
  }
});

// Obtener el detalle de un manga
mangasRouter.get<{ idManga: string }, {}>("/manga/:idManga", async (req, res) => {
    const { idManga } = req.params;

    try {
      const manga: any = await db.manga.findUnique({
        where: { id: Number(idManga) },
        include: {
          chapters: {
            select: {
              id: true, title: true, points: true, coverImage: true, usersId: true, price: true, active: true
            }
          },
          author: {
            select: {
              name: true,
            },
          },
        },
      });
  
      if (!manga) return res.status(404).json({msg: "Invalid manga ID"});
  
      let nUsers: number = 0;
      let totalPoints: number = 0;
  
      manga.chapters.map((chapter: any)=> {
        nUsers += chapter.usersId.length;
        totalPoints += chapter.points;
      });
  
      if (manga.rating !== (totalPoints/nUsers)) {
  
        let mangaUpdate = await db.manga.update({
          where: {
            id: Number(idManga)
          },
          data: {
            rating: (totalPoints / nUsers) ? (totalPoints / nUsers) : manga.rating
          }
        })
        manga.rating = (totalPoints / nUsers) ? (totalPoints / nUsers) : manga.rating
        return res.send({data: manga})
      }
  
      return res.json({ data: manga });
    } catch (error: any) {
      console.log("Detalle de manga: ", error)
      res.status(400).send({error: error.message})
    }    
});

// Ruta testing para obtener la imagen del manga
mangasRouter.get("/testImage/:id", async function (req, res) {
  const { id } = req.params;

  console.log(req.params);
  const Manga = await db.manga.findUnique({
    where: { id: Number(id) },
    include: {
      chapters: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  //Debe devolver la imagen del manga en formato jpeg
  res.setHeader("Content-Type", "image/jpeg");
  //@ts-ignore
  res.send(Manga.image);
});

mangasRouter.post<{}, {}>("/",
  isAuthenticated,
  upload.single("images"),
  async (req, res, next) => {
    const { title, synopsis, genres } = req.body;
    //@ts-ignore
    const authorId = req.user.id;
    let image;
    if (req.file) {
      image = req.file.buffer;
    } else {
      return res.status(400).send({ message: "Image is required" });
    }

    let createdManga = new Manga(title, synopsis, image, genres, authorId);

    try {
      const newManga = await db.manga.create({
        data: createdManga,
      });
      return res.json(newManga);
    } catch (error) {
      console.log(error);
      next(new Error(`Manga Post Error`));
    }
  }
);

mangasRouter.put("/manga/updateCover/:mangaId",
  isAuthenticated,
  upload.single("image"),
  async (req, res, next) => {
    const { mangaId } = req.params;
    //@ts-ignore
    const Authorship = req.user.created.find((m) => m.id === Number(mangaId));
    if (!Authorship) {
      return res.status(400).send({msg: "You not have permission to update the cover in this manga"});
    }
    let image: Buffer;
    if (req.file) {
      image = req.file.buffer;
    } else {
      return res.status(400).send({ message: "Image is required" });
    }
    try {
      await db.manga.update({
        where: { id: Number(mangaId) },
        //@ts-ignore
        data: { image },
      });
      return res.status(204).send();
    } catch (error: any) {
      console.log(error);
      res.status(400).send({ message: "Error updating cover" });
    }
  }
);

// Para borrar todos los  mangas de la DB
mangasRouter.delete<{}, {}>("/", async (req, res, next) => {
  await db.manga.deleteMany({});

  res.send("Mangas deleted successfully");
});

mangasRouter.get<{}, {}>("/Search", async (req, res, next) => {
  const { title } = req.query;
  const result: any = await db.manga.findMany({
    where: {
      active:true,
      title: {
        contains: title as string,
        mode: "insensitive",
      },
    },
  });
  // let filter = result.filter((e:{}) =>
  //   e.title.toLowerCase().includes(dato.toLowerCase())
  // );
  return res.json({ data: result });
});

// Ruta de testeo , crea 25 mangas  y un usuario admin como autor y los guarda en la base de datos
mangasRouter.get<{}, {}>("/allMangas", async (req, res, next) => {
  const allMangas = await axios.get("https://api.jikan.moe/v4/manga?page=2");
  const order: any = req.query.order;
  const tags: any = req.query.tags;

  let userDb = await db.user.findUnique({ where: { username: "SuperAdmin" } });
  let user: any;
  if (!userDb) {
    let image = await axios.get(
      "https://static.wikia.nocookie.net/memes-pedia/images/0/04/Soy_admin.jpeg/revision/latest?cb=20210127042455&path-prefix=es",
      { responseType: "arraybuffer" }
    );
    let buffer = Buffer.from(image.data, "utf-8");
    const adminTest = new User(
      "Admin",
      "SuperAdmin",
      buffer,
      "soyeladmin@gmail.com"
    );

    user = await db.user.create({
      //@ts-ignore
      data: adminTest,
    });
  } else {
    user = userDb;
  }

  allMangas.data.data.forEach(async (manga: any) => {
    let genre: any = [];
    manga.genres.map((tag: any) => {
      genre.push(tag.name);
    });
    console.log(manga.images.jpg.image_url);
    let image = await axios.get(manga.images.jpg.image_url, {
      responseType: "arraybuffer",
    });
    let buffer = Buffer.from(image.data, "utf-8");
    const createdManga = new Manga(
      manga.title,
      manga.synopsis,
      buffer,
      genre,
      user.id,
      manga.scored,
      manga.chapters
    );

    try {
      await db.manga.upsert({
        where: { title: createdManga.title },
        update: {},
        create: createdManga,
      });
    } catch (error) {
      console.log(error);
    }
  });

  if (order && tags) {
    const mangaOrder = sort(
      allMangas.data.data,
      order.toLowerCase(),
      tags.toLowerCase()
    );

    return res.json(mangaOrder);
  }
  return res.json(allMangas.data.data);
});

mangasRouter.get<{}, {}>("/recentMangas", async (req, res, next) => {
  try {
    const recentMangas = await db.manga.findMany({
      where: { active:true },
      orderBy: {
        uptadedAt: "desc",
      },
      take: 10,
    });
    return res.json({ data: recentMangas });
  } catch (error) {
    console.log("Error recentMangas: ", error);
    next(new Error("recentMangas Error"));
  }
});

mangasRouter.get<{}, {}>("/listOfGenres", async (req, res, next) => {
  const mangas = await db.manga.findMany();

  let arrayGenres: string[] = [];

  mangas.forEach((manga) => {
    manga.genre.forEach((genre) => arrayGenres.push(genre));
  });
  const deleteDuplicates = new Set(arrayGenres);

  let genres = [...deleteDuplicates];

  res.send(genres);
});

// Devuelve los mangas según el autor buscado
mangasRouter.get<{}, {}>("/byAuthor", async (req, res) => {
  let { author, page } = req.query;
  if (!author) {
    return res.status(400).send({ message: "Author is required" });
  }
  if(!page || page === "" || page === "0"){
    page = "1";
  }
  try {
    let mangasResponse = await paginatedByAuthor(Number(page), author as string);
    return res.json({ data: mangasResponse[0], total: mangasResponse[1], totalMangas: mangasResponse[2] });  
  } catch (error:any) {
    console.log("Error byAuthor: ", error);
    return res.status(400).send({ message: error.message });
  }
});

mangasRouter.put<{ idManga:string }, {}>("/manga/setActive/:idManga", isAuthenticated, async (req, res, next) => {
  const { idManga } = req.params;
  //@ts-ignore
  const user = req.user
  //@ts-ignore
  if(!(user.role === "ADMIN" || user.role === "SUPERADMIN")){
    return res.status(403).send({ message: "You don't have permission to do this, Are you trying to hack us?" });
  }


  try {

    const manga = await db.manga.findUnique({
      where: { id: Number(idManga) }
    })
    if (!manga) return res.send({ message: "Manga not found" })


    const upsertManga = await db.manga.update({
      where: {
        id: Number(idManga),
      },
      data: {
        active: manga?.active === true ? false : true,
      }
    });
    return res.send(upsertManga);
  } catch (error) {
    return res.sendStatus(404).json({ message: error });
  }

});


mangasRouter.get("/panel/allMangas", async (req, res) => {
  const mangas = await db.manga.findMany({
    select: {
      id:true,
      title: true,
      author: { select: { name: true } },
      chapter: true,
      chapters: { select: { id: true, title: true } },
      genre: true,
      rating: true,
      state: true,
      active: true
    }
  });

  res.send(mangas);
});