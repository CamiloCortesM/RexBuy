import { IOrder, IProduct, IUser } from '@/interfaces';
import { Order, Product, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productsWithNoInventory: number;
  lowInventory: number;
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const orders: IOrder[] = await Order.find({});
  const products: IProduct[] = await Product.find({});
  const numberOfOrders: number = orders.length;
  const paidOrders: number = orders.filter((order) => order.isPaid).length;
  const notPaidOrders: number = orders.filter((order) => order.isPaid).length;
  const numberOfClients: number = (await User.find({ role: 'client' })).length;
  const numberOfProducts: number = products.length;
  const productsWithNoInventory: number = products.filter(
    (product) => product.inStock === 0
  ).length;
  const lowInventory: number = products.filter(
    (product) => product.inStock <= 10
  ).length;
  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  });
}
