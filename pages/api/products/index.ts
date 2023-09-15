import type { NextApiRequest, NextApiResponse } from 'next';

import { Product } from '../../../models';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { SHOP_CONSTANTS } from '@/constants';

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

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}/products/${image}`;
    });
    return product;
  });

  return res.status(200).json(updatedProducts);
};

export default handler;
