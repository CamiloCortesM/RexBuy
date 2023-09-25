import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { IOrder } from '@/interfaces';
import { Order } from '@/models';

type Data = { message: string } | IOrder[];

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'GET':
      return getOrders(res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
const getOrders = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const orders = await Order.find()
    .sort({ createdAt: 'desc' })
    .populate('user', 'name email userImage')
    .lean();
  return res.status(200).json(orders);
};

export default handler;