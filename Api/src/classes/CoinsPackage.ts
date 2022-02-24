export default class CoinsPackage {
  id: number | undefined;
  title: string;
  sellprice: number;
  buyprice: number;
  value: number;

  constructor(
    value: number,
    title?: string,
    sellprice?: number,
    buyprice?: number,
    id?: number | undefined
  ) {
    this.value = value;
    this.title = title || "sell operation";
    this.sellprice = sellprice || 7;
    this.buyprice = buyprice || 0;
    this.id = id || undefined;
  }
}
