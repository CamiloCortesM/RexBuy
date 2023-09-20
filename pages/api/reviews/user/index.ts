import { db } from '@/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import authOptions from '@/pages/api/auth/[...nextauth]';
import { Review, User } from '@/models';
import { IReview } from '@/interfaces/review';

type Data =
  | {
      message: string;
    }
  | IReview[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  switch (req.method) {
    case 'GET':
      await getReviewsByUser(req, res);
      break;
    default:
      res.status(400).json({
        message: 'Bad request',
      });
      break;
  }
  res.status(200).json({ message: 'Example' });
};

const getReviewsByUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session: any = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to post a review' });
  }

  const user = await User.findOne({ email: session.user.email }).lean();
  const userId = user!._id.toString();

  const reviews = await Review.find({ user: userId })
    .select('-user')
    .populate('product', '_id images slug title brand model type');

  res.status(200).json(reviews);
};

export default handler;
