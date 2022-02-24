export default class internalOrder {
  id: number | undefined;
  sellerId: String;
  buyerId: String;
  productId: number;
  value: number;

  constructor(
    sellerId: String,
    buyerId: String,
    productId: number,
    value: number,
    id?: number | undefined
  ) {
    this.sellerId = sellerId;
    this.buyerId = buyerId;
    this.productId = productId;
    this.value = value;
    this.id = id || undefined;
  }
}
