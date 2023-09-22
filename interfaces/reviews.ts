import { IProduct } from './products';
import { IUser } from './user';

export interface IReview {
  _id       : string;
  comment   : string;
  user      : IUser | string;
  images    : string[] | []
  product   : IProduct;
  rating    : number;
  reviewed  : boolean;

  createdAt?: string;
  updatedAt?: string;
}


export interface ReviewData {
  _id       : string;
  comment   : string;
  images    : string[]
  product   : IProduct;
  rating    : number;
}