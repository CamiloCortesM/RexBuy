import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { IOrder } from '@/interfaces';
import { db } from '@/database';
import { Order, Product, User } from '@/models';
import authOptions from '@/pages/api/auth/[...nextauth]';
import { getSession } from 'next-auth/react';

type Data = { message: string } | IOrder;

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
};

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;

  // Verify user session
  const session: any = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to purchase' });
  }

  // Create array with products
  const productsIds = orderItems.map((product) => product._id);

  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        (prod) => prod.id === current._id
      )?.price;
      if (!currentPrice) {
        throw new Error('Verify the cart');
      }

      return current.quantity * currentPrice + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * (taxRate + 1);

    if (total !== backendTotal) {
      throw new Error('Total has been modify, check again.');
    }

    const user= await User.findOne({email: session.user.email}).lean();
    const userId = user!._id.toString();

    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({ message: error.message || 'Check server logs' });
  }

  // return res.status(201).json(req.body);
};

export default handler;
