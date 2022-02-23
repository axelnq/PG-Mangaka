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
