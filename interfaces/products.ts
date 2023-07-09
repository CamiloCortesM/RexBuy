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
  capacidad?: string[];
  ram?: string[];
  type: ITechnologyType;
}

type ITechnologyType =
  | 'celulares'
  | 'computadores'
  | 'videojuegos'
  | 'accesorios'
  | 'tabletas'
  | 'smartwatch'
  | 'monitores';
