import { Router } from "express";
import { db } from "../app";
import Manga from '../classes/Manga';
import User from '../classes/User';
export const mangasRouter = Router();
import axios from "axios";
import { sort } from '../utils/sorts';
import paginated from '../utils/paginated';


// obtiene todos los mangas de la DB y podes recibir por query , el orden (ASC o DESC) y el tags que seria por ejemplo , "tittle" , "chapters" , "rating"
mangasRouter.get<{}, {}>('/directory', async (req, res, next) => {
    let { page } = req.query;
    if (!page) {
        page = '1';
    }
    let mangasResponse: [Manga[], number]
    try{
        mangasResponse = await paginated(Number(page));
    } catch(e:any) {
        return res.status(404).send({message: e.message});
    }
    let paginatedMangas: Manga[] = mangasResponse[0];
    const order: any = req.query.order;
    const tags: any = req.query.tags;

   
    if (order && tags) {
        
        paginatedMangas = sort(paginatedMangas, order.toLowerCase(), tags.toLowerCase());
    }

    res.json({data: paginatedMangas, totalPages: mangasResponse[1]});
})

// Obtener los 10 mangas mas populares por rating
mangasRouter.get<{},{}>("/popularMangas", async (req, res) => {
    try {
        
        const popularMangas = await db.manga.findMany({
            where: {
                rating: {
                    gte: 8
                }
            },
            orderBy: {
                rating: "desc",
            },
            take: 10
        })

        return res.json(popularMangas)
    } catch (err) {
        console.log(err)
    }
})

// Obtener el detalle de un manga
mangasRouter.get<{ idManga: string }, {}>("/manga/:idManga", async (req, res, next) => {
    const { idManga } = req.params;
  
    console.log(req.params);
    const Manga: any = await db.manga.findUnique({
      where: { id: Number(idManga) },
    });
    return res.send(Manga);
  });



// Para la creacion de mangas hardcodeamos el usuario para el authorID.
mangasRouter.post<{}, {}>('/', async (req, res, next) => {
    const { title, synopsis, images, authorId, genre } = req.body;
    const createdManga = new Manga(title, synopsis, images, genre, authorId);

    try {
        const newManga = await db.manga.create({
            data: createdManga
        })
        return res.json(newManga);
    } catch (error) {
        next(new Error(`Manga Post Error`))
    }
})

// Para borrar todos los  mangas de la DB
mangasRouter.delete<{}, {}>('/', async (req, res, next) => {
    await db.manga.deleteMany({});

    res.send('Mangas deleted successfully');
})


// Ruta de testeo , crea 25 mangas  y un usuario admin como autor y los guarda en la base de datos 
mangasRouter.get<{}, {}>('/allMangas', async (req, res, next) => {
    const allMangas = await axios.get('https://api.jikan.moe/v4/manga?page=2');
    const order: any = req.query.order;
    const tags: any = req.query.tags;


    let userDb = await db.user.findUnique({ where: { username: "SuperAdmin" } });
    let user: any;


    if (!userDb) {
        const adminTest = new User("Admin", "SuperAdmin", "soyElAdmin", "soyeladmin@gmail.com");

        user = await db.user.create({
            data: adminTest
        })

    } else {
        user = userDb;
    }

    allMangas.data.data.forEach(async (manga: any) => {
        let genre: any = [];
        manga.genres.map((tag: any) => {
            genre.push(tag.name);
        })

        const createdManga = new Manga(manga.title, manga.synopsis, [manga.images.jpg.image_url, manga.images.jpg.small_image_url], genre, user.id, manga.scored, manga.chapters);

        try {
            await db.manga.upsert({
                where: { title: createdManga.title },
                update: {},
                create: createdManga,
            })

        } catch (error) {
            console.log(error);
        }
    })
   
    if (order && tags) {
        
        const mangaOrder = sort(allMangas.data.data, order.toLowerCase(), tags.toLowerCase());

        return res.json(mangaOrder)
    }

    return res.json(allMangas.data.data);

})
