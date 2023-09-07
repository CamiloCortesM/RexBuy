import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces';

type Data = { message: string } | IProduct[];

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res);
    default:
      return res.status(400).json({
        message: 'Bad Request',
      });
  }
};

const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { q = '' } = req.query;

  if (q.length === 0) {
    return res.status(400).json({
      message: 'You must specify the search query',
    });
  }

  q = q.toString().toLowerCase();

  await db.connect();
  const products = await Product.find({
    $text: { $search: q },
  })
    .select('title images inStock price slug -_id')
    .lean();
  await db.disconnect();

  return res.status(200).json(products);
};

export default handler;
