import { IProduct } from "./products";
import { IUser } from "./user";

export interface IFavorite {
    _id       : string;
    user      : IUser | string;
    product   : IProduct;
}