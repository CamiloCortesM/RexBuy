import type { NextApiRequest, NextApiResponse } from 'next';
import authOptions from '@/pages/api/auth/[...nextauth]';
import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import Favorite from '@/models/Favorite';
import { IFavorite } from '@/interfaces';
import { Product } from '@/models';
import { getServerSession } from 'next-auth';

type Data =
  | {
      message: string;
    }
  | IFavorite
  | null;

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  db.connect();
  switch (req.method) {
    case 'DELETE':
      return deleteFavoriteProduct(req, res);
    case 'GET':
      return getFavoriteProductByProduct(req, res);
    default:
      break;
  }
  return res.status(200).json({ message: 'Example' });
};

const deleteFavoriteProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session: any = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to add to favorites' });
  }

  let { id = '' } = req.query;

  if (!isValidObjectId(id)) {
    res.status(400).json({
      message: 'this is not valid mongo id',
    });
  }

  try {
    const product = await Product.findById(id);
    let deletedFavorite: IFavorite | null;
    if (product) {
      deletedFavorite = await Favorite.findOneAndDelete({ product: id });
    } else {
      deletedFavorite = await Favorite.findByIdAndDelete(id);
    }
    if (!deletedFavorite) {
      return res
        .status(404)
        .json({ message: 'Product not found in favorites' });
    }

    return res.status(200).json({
      message: 'Product removed from favorites successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getFavoriteProductByProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session: any = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to add to favorites' });
  }

  let { id = '' } = req.query;

  if (!isValidObjectId(id)) {
    res.status(400).json({
      message: 'this is not valid mongo id',
    });
  }

  const product = Product.findById(id);

  if (!product) {
    res.status(400).json({
      message: 'product not exists with this id',
    });
  }

  try {
    const favoriteProduct = await Favorite.findOne({ product: id });
    return res.status(200).json(favoriteProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
