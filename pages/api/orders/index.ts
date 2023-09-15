import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import authOptions from '@/pages/api/auth/[...nextauth]';
import { IOrder } from '@/interfaces';
import { db } from '@/database';
import { Order, Product, User } from '@/models';

type Data = { message: string } | IOrder;

const handler = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
};

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { orderItems, total } = req.body as IOrder;

    const session: any = await getServerSession(req, res, authOptions);

    if (!session) {
      return res
        .status(401)
        .json({ message: 'You must be logged in to purchase' });
    }

    const productsIds = orderItems.map((product) => product._id);

    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    const subTotal = orderItems.reduce((prev, current) => {
      const product = dbProducts.find((prod) => prod.id === current._id);
      const capacity = current.capacity || '';
      const ram = current.ram || '';
      let currentPrice;
      if (product?.priceAndStockVariations?.length! > 0) {
        currentPrice = product?.getPriceForVariation(capacity, ram);
      } else {
        currentPrice = product?.price;
      }

      if (!currentPrice) {
        throw new Error('Verify the cart');
      }

      return current.quantity * currentPrice + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * (taxRate + 1);

    if (total !== backendTotal) {
      throw new Error('Total has been modified, check again.');
    }

    for (const item of orderItems) {
      const product = dbProducts.find((p) => p.id === item._id);

      if (product) {
        if (product.inStock < item.quantity) {
          return res.status(400).json({
            message: 'Not enough stock for the product',
          });
        }
        product.inStock -= item.quantity;

        if (product.priceAndStockVariations!.length > 0) {
          product.priceAndStockVariations?.forEach((variation) => {
            if (
              (variation.capacity === item.capacity ||
                (!variation.capacity && !item.capacity)) &&
              (variation.ram === item.ram || (!variation.ram && !item.ram))
            ) {
              if (variation.stock < item.quantity) {
                return res.status(400).json({
                  message: 'Not enough stock for the product',
                });
              }
              variation.stock -= item.quantity;
            }
          });
        }

        try {
          await product.save();
        } catch (error) {
          console.error(error);
        }
      }
    }

    const user = await User.findOne({ email: session.user.email }).lean();
    const userId = user!._id.toString();

    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    newOrder.total = Math.round(newOrder.total * 100) / 100;

    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || 'Check server logs' });
  }
};

export default handler;
