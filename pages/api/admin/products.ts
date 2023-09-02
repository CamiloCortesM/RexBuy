import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

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
      return createProduct(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProducts = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: 'asc' }).lean();
  await db.disconnect();

  //TODO:
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
    // https://res.cloudinary.com/dnba3kkh6/image/upload/v1693102571/paualm7d4zo7u8dwuykn.jpg
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        //delete cloudinary
        const [fileId, extension] = image
          .substring(image.lastIndexOf('/') + 1)
          .split('.');

        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.updateOne(req.body);
    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
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
  //TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg
  try {
    await db.connect();
    const productInDB = await Product.findOne({ slug: req.body.slug });

    if (productInDB) {
      return res
        .status(400)
        .json({ message: 'ya existe un proucto con ese slug' });
    }
    const product = new Product(req.body);
    await product.save();
    await db.disconnect();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: 'Revisar logs del servidor' });
  }
};
