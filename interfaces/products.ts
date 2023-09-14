export interface IProduct {
  _id                     : string;
  description             : string;
  images                  : string[];
  inStock                 : number;
  price                   : number;
  slug                    : string;
  tags                    : string[];
  title                   : string;
  brand                   : string;
  model                   : string;
  capacity?               : string[];
  ram?                    : string[];
  type                    : ITechnologyType;
  priceAndStockVariations : PriceAndStockVariations[] | [];

  createdAt: string;
  updatedAt: string;

  getStockForVariation(
    capacity?: string | string[],
    ram?     : string | string[]
  ): number;

  getPriceForVariation(
    capacity?: string | string[],
    ram?     : string | string[]
  ): number;
}

export interface PriceAndStockVariations {
  capacity: string;
  ram     : string;
  stock   : number;
  price   : number;
}

type ITechnologyType =
  | 'celulares'
  | 'computadores'
  | 'videojuegos'
  | 'accesorios'
  | 'tabletas'
  | 'smartwatch'
  | 'monitores';


export interface ProductManagementData {
  _id        : string;
  description: string;
  images     : string[];
  inStock    : number;
  price      : number;
  slug       : string;
  tags       : string[];
  title      : string;
  brand      : string;
  model      : string;
  capacity   : string[];
  ram        : string[];
  type       : string;

  priceAndStockVariations: PriceAndStockVariations[] | [];
}