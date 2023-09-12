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
};

const getStockById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const { id } = req.query;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: 'the id is not valid',
      });
    }
    await db.connect();
    const product = await Product.findById(id);
    if (!product) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'the product does not exist for this id' });
    }

    if (product.priceAndStockVariations?.length === 0) {
      const inStockValue = product.inStock;
      return res.status(200).json({ inStockValue });
    }

    const { capacity = '', ram = '' } = req.query;
    const inStockValue = product.getStockForVariation(capacity, ram);

    return res.status(200).json({ inStockValue });
  } catch (error) {
    console.log(error);
    await db.disconnect();
    res.status(500).json({ message: 'Contact with admin' });
  }
};

export default handler;
