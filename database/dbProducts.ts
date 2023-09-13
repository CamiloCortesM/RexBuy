import { Product } from '@/models';
import { IProduct } from '@/interfaces';
import { db } from '.';

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    return null;
  }

  product.images = product.images.map((image) => {
    return image.includes('http')
      ? image
      : `${process.env.HOST_NAME}/products/${image}`;
  });

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}
export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select('slug -_id').lean();

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  await db.connect();
  term = term.toString().toLowerCase();
  const products = await Product.find({
    $text: { $search: term },
  })
    .select('title images inStock price slug -_id')
    .lean();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}/products/${image}`;
    });
    return product;
  });

  return updatedProducts;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();
  const products = await Product.find().lean();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}/products/${image}`;
    });
    return product;
  });

  return JSON.parse(JSON.stringify(updatedProducts));
};
