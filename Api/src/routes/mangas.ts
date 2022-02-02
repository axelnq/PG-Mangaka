import { Router } from "express"
import { db } from "../app"
import Manga from '../classes/Manga'
import User from '../classes/User'
export const mangasRouter = Router();
import axios from "axios";

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

mangasRouter.get<{}, {}>('/directory', async (req, res, next) => {
    const allMangas = await db.manga.findMany();

    res.json(allMangas);
})

// List of mangas
/*
mangasRouter.get<{}, {}>('/allMangas', async (req, res, next) => {
    const allMangas = await axios.get('https://api.mangadex.org/manga?limit=100');

    let userDb = await db.user.findUnique({ where: { username: "SuperAdmin" } });
    let user:any;

    
    if (!userDb) {
        const adminTest = new User("Admin", "SuperAdmin", "soyElAdmin", "soyeladmin@gmail.com");

        user = await db.user.create({
            data: adminTest
        })

    } else {
        user = userDb;
    }
    
    allMangas.data.data.forEach(async (manga: any) => {
        let genre:any = [];
        manga.attributes.tags.map((tag: any) => {
            if (tag.attributes.group === 'genre') {
                genre.push(tag.attributes.name.en);
            }
           
        })
        const rating = Math.floor(Math.random() * (6 - 1)) + 1;
       
        const createdManga = new Manga(manga.attributes.title.en, manga.attributes.description.en, [`${manga.attributes.title.en} coverImage`, `${manga.attributes.title.en} backCoverImage`], genre, user.id,rating);

        try {
            await db.manga.create({
                data: createdManga
            })

        } catch (error) {
           console.log(error);
        }
    })



    res.json(allMangas.data);
})
*/


mangasRouter.get<{}, {}>('/allMangas', async (req, res, next) => {
    const allMangas = await axios.get('https://api.jikan.moe/v4/manga?page=2');
    const order: any = req.query.order;


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

    if (order) {
        const mangaOrder = await db.manga.findMany({
            orderBy: [
                {
                    rating: order.toLowerCase(),
                }

            ]
        })

        return res.json(mangaOrder)
    }

    return res.json(allMangas.data.data);

})



mangasRouter.delete<{}, {}>('/', async (req, res, next) => {
    await db.manga.deleteMany({});

    res.send('Mangas deleted successfully');
})

mangasRouter.get("/popularMangas", async (req, res) => {
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
