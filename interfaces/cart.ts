export interface ICartProduct {
  _id      : string;
  image    : string;
  price    : number;
  slug     : string;
  title    : string;
  brand    : string;
  model    : string;
  capacity?: string;
  ram?     : string[];
  quantity : number;
}
