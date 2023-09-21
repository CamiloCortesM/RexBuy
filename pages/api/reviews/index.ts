import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import authOptions from '@/pages/api/auth/[...nextauth]';
import { db } from '@/database';
import { IReview } from '@/interfaces/review';
import { Product, Review, User } from '@/models';

type Data =
  | {
      message: string;
    }
  | IReview[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  switch (req.method) {
    case 'PUT':
      return await createReviewAndMarkAsReviewed(req, res);
    case 'GET':
      return await getAllReviews(res);
    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
};

const createReviewAndMarkAsReviewed = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { product, comment = '', images = [], rating } = req.body as IReview;

  const session: any = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to post a review' });
  }
  const productInDB = await Product.findById(product);

  if (!productInDB) {
    return res
      .status(400)
      .json({ message: 'there is no review for this user or this product' });
  }
  const user = await User.findOne({ email: session.user.email }).lean();
  const userId = user!._id.toString();

  const review = await Review.findOne({ product, user: userId });

  if (!review) {
    return res
      .status(400)
      .json({ message: 'there is no review for this user or this product' });
  }
  const previousRating = review.rating;
  const { numReviewers, rating: ratingInDB } = productInDB;
  review.comment = comment;
  review.images = images;
  review.rating = rating;

  if (!review.reviewed) {
    review.reviewed = true;

    productInDB.rating =
      (ratingInDB * numReviewers + rating) / (numReviewers + 1);
  } else {
    productInDB.rating =
      (ratingInDB * numReviewers + (rating - previousRating)) / numReviewers;
  }

  await productInDB.save();
  await review.save();

  res.status(200).json({
    message: 'review successfully created',
  });
};

const getAllReviews = async (res: NextApiResponse<Data>) => {
  try {
    const reviews = await Review.find({ reviewed: true })
      .select('rating reviewed comment product -_id')
      .lean();

    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error in Server',
    });
  }
};

export default handler;
