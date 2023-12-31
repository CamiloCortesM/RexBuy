import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { db } from '@/database';
import { IPaypal } from '@/interfaces';
import { Order, Review } from '@/models';

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');
  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || '',
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
    console.log(error);

    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(400).json({ message: 'Unable to confirm Paypal token' });
  }

  const { transactionId = '', orderId = '' } = req.body;

  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    }
  );

  if (data.status !== 'COMPLETED') {
    return res.status(401).json({ message: 'Order not recognized' });
  }

  const dbOrder = await Order.findById(orderId);

  if (!dbOrder) {
    return res
      .status(401)
      .json({ message: 'Order does not exist in the database' });
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    return res
      .status(401)
      .json({ message: 'Paypal amounts and our order are not the same.' });
  }

  const { orderItems, user } = dbOrder;

  orderItems.forEach(async ({ _id }) => {
    const review = await Review.exists({ product: _id, user });
    if (review) return;
    const newReview = new Review({ product: _id, user });
    await newReview.save();
  });

  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;

  await dbOrder.save();

  return res.status(200).json({ message: 'Order Paid' });
};

export default handler;
