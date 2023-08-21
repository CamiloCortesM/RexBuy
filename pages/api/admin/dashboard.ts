import { IOrder, IProduct, IUser } from '@/interfaces';
import { Order, Product, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../database/db';
import { db } from '@/database';

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
  await db.connect();
  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: 'client' }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
  ]);

  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  });
}
