import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import Favorite from '@/models/Favorite';
import { IFavorite } from '@/interfaces';

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
  const session: any = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to add to favorites' });
  }

  const id = session.user._id;

  const { product = '' } = req.body;

  if (!isValidObjectId(product)) {
    return res.status(400).json({
      message: 'this is not mongo id',
    });
  }

  const favorite = new Favorite({ product, user: id });
  await favorite.save();

  return res.status(200).json(favorite);
};

const getAllFavoriteProductsForUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session: any = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to add to favorites' });
  }

  const id = session.user._id;

  const favoriteProducts = await Favorite.find({ user: id });

  return res.status(200).json(favoriteProducts);
};

export default handler;
