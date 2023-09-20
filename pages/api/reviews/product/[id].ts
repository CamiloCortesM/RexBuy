import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import { IReview } from '@/interfaces/review';
import { Review } from '@/models';

type Data =
  | {
      message: string;
    }
  | IReview[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  switch (req.method) {
    case 'GET':
      return await getReviewsByProduct(req, res);
    default:
      return res.status(400).json({
        message: 'Bad Request',
      });
  }
};

const getReviewsByProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { id = '' } = req.query;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'the product id is not valid',
    });
  }

  const reviews = await Review.find({ product: id, reviewed: true })
    .select('-product')
    .populate('user', 'name')
    .lean();

  res.status(200).json(reviews);
};
export default handler;
