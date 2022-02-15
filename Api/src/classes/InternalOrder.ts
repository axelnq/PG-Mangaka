export default class internalOrder {
  id: number | undefined;
  sellerId: String;
  buyerId: String;
  productId: number;

  constructor(
    sellerId: String,
    buyerId: String,
    productId: number,
    id?: number | undefined
  ) {
    this.sellerId = sellerId;
    this.buyerId = buyerId;
    this.productId = productId;
    this.id = id || undefined;
  }
}
