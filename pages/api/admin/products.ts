import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(res);
    case 'PUT':
      return updatedProduct(req, res);
    case 'POST':
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProducts = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: 'asc' }).lean();
  await db.disconnect();

  //TODO:
  //update images

  res.status(200).json(products);
};
const updatedProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id, images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({
      message: 'El id del producto no es valido',
    });
  }

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: 'Es necesario al menos 2 imagenes' });
  }

  //TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg

  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      return res
        .status(400)
        .json({ message: 'No existe un producto con ese ID' });
    }

    //TODO: delete pictures in CLoudinary

    await product.updateOne(req.body);
    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: 'Revisar mensaje en el servidor' });
  }
};
