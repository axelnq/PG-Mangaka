export default class extractionOrder {
  id: number | undefined;
  adminId: String;
  userId: String;
  cbu: String;
  title: String;
  price: Number;
  status: String;
  productId: Number;

  constructor(
    adminId: String,
    userId: String,
    cbu: String,
    title: String,
    price: Number,
    status: String,
    productId: Number,

    id?: number | undefined
  ) {
    this.adminId = adminId;
    this.userId = userId;
    this.cbu = cbu;
    this.title = title || "Buy Order";
    this.price = price;
    this.status = status;
    this.productId = productId;
    this.id = id || undefined;
  }
}
