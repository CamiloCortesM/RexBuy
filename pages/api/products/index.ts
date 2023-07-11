import type { NextApiRequest, NextApiResponse } from 'next';

import { Product } from '../../../models';
import { SHOP_CONSTANTS, db } from '../../../database';
import { IProduct } from '../../../interfaces';

type Data = { message: string } | IProduct[];

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    default:
      return res.status(400).json({
        message: 'Bad Request',
      });
  }
};

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { type = 'all' } = req.query;

  let condition = {};

  if (type !== 'all' && SHOP_CONSTANTS.validTypes.includes(`${type}`)) {
    condition = { type };
  }

  await db.connect();
  const products = await Product.find(condition)
    .select('title inStock images slug price -_id')
    .lean();

  await db.disconnect();

  return res.status(200).json(products);
};

export default handler;
