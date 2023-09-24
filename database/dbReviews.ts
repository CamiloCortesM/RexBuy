import { Review } from '@/models';
import { db } from '.';
import { isValidObjectId } from 'mongoose';

export const getReviewById = async (id: string) => {
  db.connect();
  if (!isValidObjectId(id)) {
    return null;
  }
  const review = await Review.findById(id)
    .select('-__v')
    .populate('product', '_id images title');
  return review;
};

export const getReviewsByUserId = async (id: string, tab: string) => {
  const reviewed = tab === 'COMPLETED' ? true : false;
  db.connect();
  const reviews = await Review.find({ user: id, reviewed })
    .select('-user -__v -images')
    .populate('product', 'images title')
    .lean();

  return reviews;
};

export const getReviewsByProduct = async (productId: string) => {
  db.connect;
  const reviews = await Review.find({ product: productId, reviewed: true })
    .select('-user -__v')
    .populate('product', 'images title')
    .lean();

  return JSON.parse(JSON.stringify(reviews));
};
