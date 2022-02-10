import { Router } from "express";
import { db } from "../app";
import Chapter from "../classes/Chapter";
import User, { addCoins } from "../classes/User";
import internalOrder from "../classes/InternalOrder";
export const internalOrderRouter = Router();

internalOrderRouter.post<{}, {}>("/buyChapter", async (req, res, next) => {
  const { sellerId, buyerId, productId } = req.body;
  // let tempSeller = {};
  let buyer = await db.user.findUnique({
    where: { id: buyerId },
  });
  let seller = await db.user.findUnique({ where: { id: sellerId } });

  let product = await db.chapter.findUnique({ where: { id: productId } });
  if (buyer && seller && product) {
    if (buyer.coins - product.price < 0) {
      res.send("Insuficient coins");
    } else {
      let iOrder = new internalOrder(sellerId, buyerId, productId);
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
      const updatebuyer = await db.user.update({
        where: {
          username: buyer.username,
        },
        data: {
          coins: buyer.coins - product.price,
          library: [...buyer.library, productId],
        },
      });

      res.send([newIorder, updateseller, updatebuyer]);
    }
  }
});
internalOrderRouter.post<{}, {}>("/wishlistManga", async (req, res, next) => {
  let { mangaId, userId } = req.body;
  let firstUser = await db.user.findUnique({
    where: { id: userId },
  });
  console.log(mangaId);
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
  let { mangaId, userId } = req.body;
  let firstUser = await db.user.findUnique({
    where: { id: userId },
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
