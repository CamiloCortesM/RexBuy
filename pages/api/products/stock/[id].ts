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

  console.log(id);
  if (!isValidObjectId(id)) {
    res.status(400).json({
      message: 'the id is not valid',
    });
  }

  db.connect();
  const inStockValue = (await Product.findById(id).select('inStock'))?.inStock;
  db.disconnect();

  if (!inStockValue) {
    return res
      .status(400)
      .json({ message: 'the product does not exist for this id' });
  }

  res.status(200).json({ inStockValue });
};

export default handler;
