import type { NextApiRequest, NextApiResponse } from 'next';

import { Product } from '../../../models';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';

type Data = { message: string } | IProduct;

const handler = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);
    default:
      return res.status(400).json({
        message: 'Bad Request',
      });
  }
};

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { slug } = req.query;
  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    return res.status(404).json({
      message: 'Product not Found',
    });
  }

  product.images = product.images.map((image) => {
    return image.includes('http')
      ? image
      : `${process.env.HOST_NAME}/products/${image}`;
  });

  return res.json(product);
};

export default handler;
