import { isValidObjectId } from 'mongoose';
import { db } from '.';
import Favorite from '@/models/Favorite';

export const getFavoritesByUser = async (id: string) => {
  db.connect();
  if (!isValidObjectId(id)) {
    return null;
  }
  const favorites = await Favorite.find({ user: id })
    .select('-__v -user')
    .populate(
      'product',
      'title type slug rating numReviewers inStock images brand price'
    );
  return JSON.parse(JSON.stringify(favorites));
};
