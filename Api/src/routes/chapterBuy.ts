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
