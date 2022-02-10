export default class externalOrder {
  id: number | undefined;
  adminId: String;
  userId: String;
  status: String;
  productId: number;

  constructor(
    adminId: String,
    userId: String,
    status: String,
    productId: number,

    id?: number | undefined
  ) {
    this.adminId = adminId;
    this.userId = userId;
    this.status = status;
    this.productId = productId;

    this.id = id || undefined;
  }
}
