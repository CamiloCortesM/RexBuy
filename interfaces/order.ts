import { IUser } from './user';

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: ShippingAddress;
  paymentResult?: string;

  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  isPaid: boolean;
  payAt?: string;

  transactionId?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  model: string;
  quantity: number;
  capacity?: string;
  slug: string;
  image: string;
  price: number;
  ram?: string[];
  brand: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}
