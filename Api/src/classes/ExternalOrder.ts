export default class externalOrder {
  id: number | undefined;
  adminId: String;
  userId: String;
  title: String;
  price: Number;
  value: Number;
  status: String;
  productId: Number;

  constructor(
    adminId: String,
    userId: String,
    title: String,
    price: Number,
    value: number,
    status: String,
    productId: Number,

    id?: number | undefined
  ) {
    this.adminId = adminId;
    this.userId = userId;
    this.title = title || "Buy Order";
    this.price = price;
    this.value = value;
    this.status = status;
    this.productId = productId;
    this.id = id || undefined;
  }
}
