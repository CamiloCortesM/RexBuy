import { db } from '@/database';
import { Product } from '@/models';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      message: string;
    }
  | { inStockValue: number };

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'GET':
      return getStockById(req, res);
    default:
      res.status(400).json({ message: 'Bad request' });
  }

  res.status(200).json({ message: 'Example' });
};

const getStockById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  if (!isValidObjectId(id)) {
    res.status(400).json({
      message: 'the id is not valid',
    });
  }

  db.connect();
  const product = await Product.findById(id);
  db.disconnect();
  
  if (!product) {
    return res
      .status(400)
      .json({ message: 'the product does not exist for this id' });
  }

  if (product.priceAndStockVariations?.length === 0) {
    const inStockValue = product.inStock;
    res.status(200).json({ inStockValue });
  }

  const { capacity = '', ram = '' } = req.query;

  console.log({ capacity, ram });
  const inStockValue = product.getStockForVariation(capacity, ram);

  res.status(200).json({ inStockValue });
};

export default handler;
