export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  slug: string;
  tags: string[];
  title: string;
  brand: string;
  model: string;
  capacity?: string[];
  ram?: string[];
  type: ITechnologyType;
  priceAndStockVariations?: PriceAndStockVariations[];

  createdAt: string;
  updatedAt: string;

  getStockForVariation(
    capacity?: string | string[],
    ram?: string | string[]
  ): number;
}

export interface PriceAndStockVariations {
  capacity: String;
  ram: String;
  stock: Number;
  price: Number;
}

type ITechnologyType =
  | 'celulares'
  | 'computadores'
  | 'videojuegos'
  | 'accesorios'
  | 'tabletas'
  | 'smartwatch'
  | 'monitores';
