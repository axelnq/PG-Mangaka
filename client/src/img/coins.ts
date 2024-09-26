import { Router } from "express";
import { db } from "../app";
import CoinsPackage from "../classes/CoinsPackage";

import externalOrder from "../classes/ExternalOrder";
export const externalOrderRouter = Router();
// externalOrderRouter.post<{}, {}>("/generatePackages", async (req, res) => {
//   let { id, value, title, buyprice, sellprice } = req.body;
//   let cP = new CoinsPackage(value, title, sellprice, buyprice, id);
//   const newPackage = await db.coinsPackage.create({ data: cP });
//   res.send("Bundle Coins Created");
// });
externalOrderRouter.get<{}, {}>("/createPackage", async (req, res) => {
  let cP = new CoinsPackage(600, "500 Coins + 100 coins bundle", 0, 5000);
  let cP2 = new CoinsPackage(300, "250 Coins + 50 coins bundle", 0, 2500);
  let cP3 = new CoinsPackage(130, "100 Coins + 30 coins bundle", 0, 1000);
  let cP4 = new CoinsPackage(60, "50 Coins + 10 coins bundle", 0, 500);
  let cP5 = new CoinsPackage(10, "10 coins bundle", 0, 10);
  let cP6 = new CoinsPackage(1, "Sell Order", 7, 0);
  const newPackage = await db.coinsPackage.create({ data: cP });
  const newPackage2 = await db.coinsPackage.create({ data: cP2 });
  const newPackage3 = await db.coinsPackage.create({ data: cP3 });
  const newPackage4 = await db.coinsPackage.create({ data: cP4 });
  const newPackage5 = await db.coinsPackage.create({ data: cP5 });
  const newPackage6 = await db.coinsPackage.create({ data: cP6 });
  res.send("Bundle Coins Created");
});
externalOrderRouter.post<{}, {}>("/buy", async (req, res) => {
  let { adminId, userId, status, productId } = req.body;

  let buyer = await db.user.findUnique({ where: { id: userId } });
  console.log(buyer);

  let packageCoins: any = await db.coinsPackage.findUnique({
    where: { id: productId },
  });

  if (buyer) {
    if (status !== "aproved") {
      res.send("There´s a problem with the transaction");
    } else {
      const Eorder = new externalOrder(adminId, userId, status, productId);
      //@ts-ignore
      const newEOrder = await db.externalOrder.create({ data: Eorder });
      const updateBuyer = await db.user.update({
        where: { username: buyer.username },
        data: {
          coins: buyer.coins + packageCoins.value,
        },
      });
      res.send("Coins Added");
    }
  }
});
externalOrderRouter.post<{}, {}>("/sell", async (req, res) => {
  let { adminId, userId, status, value } = req.body;
  let seller = await db.user.findUnique({ where: { id: userId } });
  let base = await db.coinsPackage.findUnique({ where: { id: 6 } });
  if (seller && base) {
    if (seller.coins - value < 0) {
      res.send("There´s a problem with the transaction");
    } else {
      let price = base?.sellprice * value;
      let pack = new CoinsPackage(value, base.title, price, 0);
      let newcP = await db.coinsPackage.create({ data: pack });
      const Eorder = new externalOrder(adminId, userId, status, newcP.id);
      //@ts-ignore
      const newEOrder = await db.externalOrder.create({ data: Eorder });
      const updateSeller = await db.user.update({
        where: { username: seller.username },
        data: { coins: seller.coins - value },
      });
      res.send("Coins Exchanged");
    }
  }
});
