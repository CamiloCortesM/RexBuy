import type { NextApiRequest, NextApiResponse } from 'next';

import { db, seedDatabase } from '../../database';
import { Product } from '../../models';

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'Access denied to endpoint' });
  }

  await db.connect();

  await Product.deleteMany();
  await Product.insertMany( seedDatabase.initialData.products );

  await db.disconnect();

  res.status(200).json({ message: 'Process carried out correctly' });
};

export default handler;
