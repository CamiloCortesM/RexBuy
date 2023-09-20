import { IProduct } from './products';
import { IUser } from './user';

export interface IReview {
  _id       : string;
  comment   : string;
  user      : IUser | string;
  images    : String[] | []
  product   : IProduct;
  rating    : number;
  reviewed  : boolean;

  createdAt?: string;
  updatedAt?: string;
}
