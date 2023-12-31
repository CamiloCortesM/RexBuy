import type { NextApiRequest, NextApiResponse } from 'next';

import { db, seedDatabase } from '../../database';
import { Order, Product, Review, User } from '../../models';
import Favorite from '@/models/Favorite';

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'Access denied to endpoint' });
  }

  await db.connect();

  await User.deleteMany();
  await User.insertMany(seedDatabase.initialData.users);

  await Product.deleteMany();
  await Product.insertMany(seedDatabase.initialData.products);

  await Review.deleteMany();
  await Favorite.deleteMany();
  await Order.deleteMany();
  res.status(200).json({ message: 'Process carried out correctly' });
};

export default handler;
