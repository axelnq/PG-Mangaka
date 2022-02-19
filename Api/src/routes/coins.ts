import { Router } from "express";
import { db } from "../app";
import CoinsPackage from "../classes/CoinsPackage";

import externalOrder from "../classes/ExternalOrder";
export const externalOrderRouter = Router();

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-1688834677183173-021518-2ef84ad52b6253c0766870f65b93fc22-1074872794",
});

externalOrderRouter.post<{}, {}>("/buy", (req, res) => {
  let product = req.body;
  console.log(req.body);
  let preference = {
    items: [
      {
        title: product.title,
        unit_price: product.buyprice,
        quantity: 1,
      },
    ],
    installments: 1,

    back_urls: {
      success: `http://localhost:3001/api/coins/pagos/${product.idaux}`,
      failure: "http://localhost:3001/api/coins/buy",
      pending: "http://localhost:3001/api/coins/buy",
    },
    auto_return: "approved",

    external_reference: product.id,
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response: any) {
      const preferenceId = response.body.id;
      console.log(preferenceId);
      res.send(response.body.id);
    })
    .catch(function (error: any) {
      console.log(error);
    });
});

externalOrderRouter.get("/pagos/:product", async (req, res) => {
  const payment_status = req.query.status;
  let { product } = req.params;
  let user2 = req.user;
  let adminId = await db.user.findUnique({ where: { username: "SuperAdmin" } });
  console.log(product)
  let packageCoins: any = await db.coinsPackage.findUnique({
    //@ts-ignore
    where: { id: Number(product) },
  });
  console.log(packageCoins.value);

  if (user2 && adminId) {
    if (payment_status !== "approved") {
      res.send("There´s a problem with the transaction");
    } else {
      try {
        //@ts-ignore
        const Eorder = new externalOrder(
          adminId.id,
          //@ts-ignore
          user2.id,
          "approved",
          packageCoins.buyprice,
          payment_status,
          packageCoins.id
        );
        //@ts-ignore
        const newEOrder = await db.externalOrder.create({ data: Eorder });
        const updateBuyer = await db.user.update({
          //@ts-ignore
          where: { id: user2.id },
          data: {
            //@ts-ignore
            coins: user2.coins + packageCoins.value,
          },
        });
        //@ts-ignore

        res.redirect("http://localhost:3000");
      } catch (error) {
        console.log(error);
        res.redirect("http://localhost:3000/error");
      }
    }
  }
});

externalOrderRouter.post<{}, {}>("/sell", async (req, res) => {
  let { adminId, userId, status, value } = req.body;
  let seller = await db.user.findUnique({ where: { id: userId } });
  let base = await db.coinsPackage.findUnique({ where: { id: 6 } });
  console.log(base);
  if (seller && base) {
    if (seller.coins - value < 0) {
      res.send("There´s a problem with the transaction");
    } else {
      let price = base?.sellprice * value;
      let pack = new CoinsPackage(value, base.title, price, 0);
      let newcP = await db.coinsPackage.create({ data: pack });
      console.log(pack);
      const Eorder = new externalOrder(
        adminId,
        userId,
        "Sell Order",
        price,
        "approved",
        newcP.id
      );
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
externalOrderRouter.get<{}, {}>("/pack", async (req, res) => {
  let pack = await db.coinsPackage.findMany();
  let packfiltered = pack.filter((e) => e.buyprice > 9);
  res.send(packfiltered);
});

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

externalOrderRouter.post<{}, {}>("/generatePackages", async (req, res) => {
  let { id, value, title, buyprice, sellprice } = req.body;
  let cP = new CoinsPackage(value, title, sellprice, buyprice, id);
  const newPackage = await db.coinsPackage.create({ data: cP });
  res.send("Bundle Coins Created");
});

externalOrderRouter.get<{}, {}>("/pack", async (req, res) => {
  let pack = await db.coinsPackage.findMany();
  let packfiltered = pack.filter((e) => e.buyprice > 9);
  res.send(packfiltered);
});
