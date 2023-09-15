import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = { message: string } | IProduct[] | IProduct;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();
  switch (req.method) {
    case 'GET':
      return getProducts(res);
    case 'PUT':
      return updatedProduct(req, res);
    case 'POST':
      return createProduct(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProducts = async (res: NextApiResponse<Data>) => {
  const products = await Product.find().sort({ title: 'asc' }).lean();
  //TODO FIX PATHS
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}/products/${image}`;
    });
    return product;
  });

  res.status(200).json(updatedProducts);
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

  try {
    const product = await Product.findById(_id);
    if (!product) {
      return res
        .status(400)
        .json({ message: 'No existe un producto con ese ID' });
    }

    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId, extension] = image
          .substring(image.lastIndexOf('/') + 1)
          .split('.');

        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.updateOne(req.body);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Revisar mensaje en el servidor' });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: 'El producto necesita por lo menos 2 imagenes' });
  }

  try {
    const productInDB = await Product.findOne({ slug: req.body.slug });

    if (productInDB) {
      return res
        .status(400)
        .json({ message: 'ya existe un proucto con ese slug' });
    }
    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Revisar logs del servidor' });
  }
};
