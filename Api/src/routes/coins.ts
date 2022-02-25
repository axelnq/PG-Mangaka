import { Router } from "express";
import { db } from "../app";
import CoinsPackage from "../classes/CoinsPackage";
import extractionOrder from "../classes/ExtractionOrder";
import externalOrder from "../classes/ExternalOrder";
export const externalOrderRouter = Router();
const { 
  SERVER_URL
} = process.env || 3001

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
      success: `${SERVER_URL}/api/coins/pagos/${product.idaux}`,
      failure: `${SERVER_URL}/api/coins/buy`,
      pending: `${SERVER_URL}/api/coins/buy`,
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
  console.log(product);
  let packageCoins: any = await db.coinsPackage.findUnique({
    //@ts-ignore
    where: { id: Number(product) },
  });
  console.log(packageCoins.value);

  if (user2 && adminId) {
    if (payment_status !== "approved") {
      res.send("Hay un problema con la compra");
    } else {
      try {
        //@ts-ignore
        const Eorder = new externalOrder(
          adminId.id,
          //@ts-ignore
          user2.id,
          "approved",
          packageCoins.buyprice,
          packageCoins.value,
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

        res.redirect(`${SERVER_URL}`);
      } catch (error) {
        console.log(error);
        res.redirect(`${SERVER_URL}/error`);
      }
    }
  }
});

externalOrderRouter.post<{}, {}>("/sell", async (req, res) => {
  console.log('sell')
  let { name, cbu, value } = req.body;
  let user2 = req.user;
  let nValue = Number(value);
  if (user2) {
    //@ts-ignore
    let adminId = await db.user.findUnique({
      where: { username: "SuperAdmin" },
    });
    //@ts-ignore
    let seller = await db.user.findUnique({ where: { id: user2.id } });
    let base = await db.coinsPackage.findUnique({ where: { id: 6 } });
    console.log(base);
    if (seller && base && adminId) {
      if (seller.coins - nValue < 0) {
        res.send("Estan intentado extraer mas monedas de las que tienes");
      } else {
        let price = base?.sellprice * nValue;
        let pack = new CoinsPackage(nValue, base.title, price, 0);
        let newcP = await db.coinsPackage.create({ data: pack });
        console.log(pack);
        const Eorder = new extractionOrder(
          adminId.id,
          seller.id,
          name,
          cbu,
          "Orden de extraccion",
          nValue,
          price,
          "approved",
          newcP.id
        );
        //@ts-ignore
        const newEOrder = await db.extractionOrder.create({ data: Eorder });
        const updateSeller = await db.user.update({
          where: { username: seller.username },
          data: { coins: seller.coins - nValue },
        });
        res.send("Peticion de extraccion recibida");
      }
    }
  }
});
externalOrderRouter.get<{}, {}>("/pack", async (req, res) => {
  let pack = await db.coinsPackage.findMany();
  let packfiltered = pack.filter((e) => e.buyprice > 9);
  res.send(packfiltered);
});

externalOrderRouter.get<{}, {}>("/createPackage", async (req, res) => {
  let cP = new CoinsPackage(
    600,
    "500 Monedas + 100 Monedas de regalo",
    0,
    5000
  );
  let cP2 = new CoinsPackage(
    300,
    "250 Monedas + 50 Monedas de regalo",
    0,
    2500
  );
  let cP3 = new CoinsPackage(
    130,
    "100 Monedas + 30 Monedas de regalo",
    0,
    1000
  );
  let cP4 = new CoinsPackage(60, "50 Monedas + 10 Monedas de regalo", 0, 500);
  let cP5 = new CoinsPackage(10, "10 Monedas", 0, 10);
  let cP6 = new CoinsPackage(1, "Orden de extraccion", 7, 0);
  const newPackage = await db.coinsPackage.create({ data: cP });
  const newPackage2 = await db.coinsPackage.create({ data: cP2 });
  const newPackage3 = await db.coinsPackage.create({ data: cP3 });
  const newPackage4 = await db.coinsPackage.create({ data: cP4 });
  const newPackage5 = await db.coinsPackage.create({ data: cP5 });
  const newPackage6 = await db.coinsPackage.create({ data: cP6 });
  res.send("Combos de monedas creados");
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

externalOrderRouter.get<{}, {}>("/getBuyOrders", async (req, res) => {
  let user2 = req.user; //@ts-ignore
  let info = await db.externalOrder.findMany({ where: { userId: user2.id } });
  res.send(info);
});

externalOrderRouter.get<{}, {}>("/getSellOrders", async (req, res) => {
  let user2 = req.user; //@ts-ignore
  let info = await db.extractionOrder.findMany({ where: { userId: user2.id } });
  res.send(info);
});
