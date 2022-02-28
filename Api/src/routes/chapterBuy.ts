import { Router } from "express";
import { db } from "../app";
import Chapter from "../classes/Chapter";
import User from "../classes/User";
import internalOrder from "../classes/InternalOrder";
import { isAuthenticated } from "./auth";
export const internalOrderRouter = Router();


internalOrderRouter.post<{}, {}>(
  "/buyChapter",
  isAuthenticated,
  async (req, res, next) => {
    const { sellerId, productId } = req.body;
    let buyeruser = req.user;
    let productid = Number(productId);
    // let tempSeller = {};
    let buyer = await db.user.findUnique({
      //@ts-ignore
      where: { id: buyeruser.id },
    });
    let seller = await db.user.findUnique({ where: { id: sellerId } });

    let product = await db.chapter.findUnique({ where: { id: productid } });
    if (buyer && seller && product) {
      if (buyer.coins - product.price < 0) {
        res.send("Insuficient coins ");
      } else {
        //@ts-ignore
        let iOrder = new internalOrder(
          sellerId,
          //@ts-ignore
          buyeruser.id,
          productid,

          product.price
        );
        //@ts-ignore
        const newIorder = await db.internalOrder.create({ data: iOrder });

        const updateseller = await db.user.update({
          where: {
            username: seller.username,
          },
          data: {
            coins: seller.coins + product.price,
          },
        });
        if (!buyer.library.includes(product.mangaId)) {
          const updatebuyer = await db.user.update({
            where: {
              username: buyer.username,
            },
            data: {
              coins: buyer.coins - product.price,
              chapters: [...buyer.chapters, productid],
              library: [...buyer.library, product.mangaId],
            },
          });

          res.send("exito");
          // res.redirect("http://localhost:3000");
        } else {
          const updatebuyer = await db.user.update({
            where: {
              username: buyer.username,
            },
            data: {
              chapters: [...buyer.chapters, productid],
              coins: buyer.coins - product.price,
            },
          });
          res.send("exito");
          // res.redirect("http://localhost:3000");
        }
      }
    }
  }
);

internalOrderRouter.post<{}, {}>("/wishlistManga", async (req, res, next) => {
  let { mangaId } = req.body;
  let user2 = req.user;
  console.log(mangaId);
  let firstUser = await db.user.findUnique({
    //@ts-ignore
    where: { id: user2.id },
  });
  if (firstUser && !firstUser.wishList.includes(mangaId)) {
    const updateUser = await db.user.update({
      where: { username: firstUser.username },
      data: {
        wishList: [...firstUser.wishList, mangaId],
      },
    });
    res.send("Added to Wishlist");
  } else {
    res.send("You already have this manga in wishlist");
  }
});

internalOrderRouter.post<{}, {}>("/favoritesManga", async (req, res, next) => {
  let { mangaId } = req.body;
  let user2 = req.user;
  let firstUser = await db.user.findUnique({
    //@ts-ignore
    where: { id: user2.id },
  });
  console.log(mangaId);
  if (firstUser && !firstUser.favorites.includes(mangaId)) {
    const updateUser = await db.user.update({
      where: { username: firstUser.username },
      data: {
        favorites: [...firstUser.favorites, mangaId],
      },
    });
    res.send("Added to Favorites");
  } else {
    res.send("You already have this manga in Favorites");
  }
});
internalOrderRouter.get<{}, {}>("/getBuyerOrder", async (req, res) => {
  let user2 = req.user; //@ts-ignore
  let info = await db.internalOrder.findMany({ where: { buyerId: user2.id } });
  res.send(info);
});
internalOrderRouter.get<{}, {}>("/getSellerOrder", async (req, res) => {
  let user2 = req.user; //@ts-ignore
  let info = await db.internalOrder.findMany({ where: { sellerId: user2.id } });
  res.send(info);
});


internalOrderRouter.get<{}, {}>(
  "/buyAllManga",
  isAuthenticated,
  async (req, res, next) => {
    const { sellerId, productId } = req.body;
    let buyeruser = req.user;
    let productid = Number(productId);
    // let tempSeller = {};
    let buyer: any = await db.user.findUnique({
      //@ts-ignore
      where: { id: buyeruser.id },
    });

    const manga: any = await db.manga.findUnique({
      where: { id: Number(productid) },

      select: {
        id: true,
        chapters: {
          select: {
            id: true, title: true, price: true
          }
        }
      },
    });

    let totalPrice: number = 0;
    let chaptersIds: number[] = [];

    manga.chapters.map((chapter: any) => {
      if (!(buyer.chapters.includes(chapter.id))) {
        totalPrice += chapter.price;
        chaptersIds.push(chapter.id)
      }
    });
    totalPrice -= 5;
    
    let seller = await db.user.findUnique({ where: { id: sellerId } });

    if (!(buyer && seller && manga)) return res.send("Falta informacion")

    if ((buyer.coins - totalPrice < 0)) return res.send("Monedas insuficientes");

    if (!(totalPrice > 0)) return  res.send("No hay mangas que comprar");
 
    try {
      for (const chapter of chaptersIds) {
        let iOrder = new internalOrder(
          sellerId,
          //@ts-ignore
          buyeruser.id,
          chapter,
          totalPrice
        );
        //console.log(iOrder2)
        //@ts-ignore
        const newIorder = await db.internalOrder.create({ data: iOrder });
      }
      
      
      const updatebuyer = await db.user.update({
        where: {
          username: buyer.username,
        },
        data: {
          coins: buyer.coins - totalPrice,
          chapters: [...buyer.chapters, ...chaptersIds],
          library: [...buyer.library, manga.id],
        },
      });

      const updateseller = await db.user.update({
        where: {
          username: seller.username,
        },
        data: {
          coins: seller.coins + totalPrice,
        },
      });

      res.send("exito");
      // res.redirect("http://localhost:3000");

    } catch (err: any) {
      res.send(err.message)
    }

  }
);
