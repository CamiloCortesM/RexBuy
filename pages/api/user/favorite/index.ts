import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import Favorite from '@/models/Favorite';
import { IFavorite } from '@/interfaces';
import { getServerSession } from 'next-auth';
import authOptions from '@/pages/api/auth/[...nextauth]';
import { User } from '@/models';

type Data =
  | {
      message: string;
    }
  | IFavorite
  | IFavorite[];

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  db.connect();
  switch (req.method) {
    case 'GET':
      return getAllFavoriteProductsForUser(req, res);
    case 'POST':
      return newFavoriteProduct(req, res);
    default:
      break;
  }
  return res.status(200).json({ message: 'Example' });
};

const newFavoriteProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session: any = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to add to favorites' });
  }

  const user = await User.findOne({ email: session.user.email }).lean();
  const userId = user!._id.toString();

  const { product = '' } = req.body;

  if (!isValidObjectId(product)) {
    return res.status(400).json({
      message: 'this is not mongo id',
    });
  }

  const favorite = new Favorite({ product, user: userId });
  await favorite.save();

  return res.status(200).json(favorite);
};

const getAllFavoriteProductsForUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session: any = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to add to favorites' });
  }

  const user = await User.findOne({ email: session.user.email }).lean();
  const userId = user!._id.toString();

  const favoriteProducts = await Favorite.find({ user: userId });

  return res.status(200).json(favoriteProducts);
};

export default handler;
