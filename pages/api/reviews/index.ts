import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import authOptions from '@/pages/api/auth/[...nextauth]';
import { db } from '@/database';
import { IReview } from '@/interfaces/reviews';
import { Product, Review, User } from '@/models';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data =
  | {
      message: string;
    }
  | IReview[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
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
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error in Server' });
  }
};

const createReviewAndMarkAsReviewed = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const { product, comment = '', images = [], rating } = req.body as IReview;

    console.log({ product, comment, images, rating });

    const session: any = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: 'You must be logged in to post a review' });
    }
    const productInDB = await Product.findById(product._id);

    if (!productInDB) {
      return res
        .status(400)
        .json({ message: 'there is no review for this user or this product' });
    }
    const user = await User.findOne({ email: session.user.email }).lean();
    const userId = user!._id.toString();

    const review = await Review.findOne({ product: product._id, user: userId });

    if (!review) {
      return res
        .status(400)
        .json({ message: 'there is no review for this user or this product' });
    }

    review.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId, extension] = image
          .substring(image.lastIndexOf('/') + 1)
          .split('.');

        await cloudinary.uploader.destroy(fileId);
      }
    });

    const previousRating = review.rating;
    const { numReviewers, rating: ratingInDB } = productInDB;
    review.comment = comment;
    review.images = images;
    review.rating = rating;

    if (!review.reviewed) {
      review.reviewed = true;
      productInDB.rating =
        (ratingInDB * numReviewers + rating) / (numReviewers + 1);
      productInDB.numReviewers = numReviewers + 1;
    } else {
      productInDB.rating =
        (ratingInDB * numReviewers + (rating - previousRating)) / numReviewers;
    }

    await productInDB.save();
    await review.save();

    res.status(200).json({
      message: 'review successfully created',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error in Server' });
  }
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
