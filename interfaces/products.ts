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

  // TODO: add createdAt and updatedAt
  createdAt: string;
  updatedAt: string;
}

type ITechnologyType =
  | 'celulares'
  | 'computadores'
  | 'videojuegos'
  | 'accesorios'
  | 'tabletas'
  | 'smartwatch'
  | 'monitores';
