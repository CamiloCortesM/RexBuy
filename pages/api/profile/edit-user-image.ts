import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import authOptions from '@/pages/api/auth/[...nextauth]';
import { db } from '@/database';
import { User } from '@/models';
import { IUser } from '@/interfaces';

type Data =
  | {
      message: string;
    }
  | {
      updatedUser: IUser;
    };

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      return await editImage(req, res);
    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
};

const editImage = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const session: any = await getServerSession(req, res, authOptions);
  const userImage = req.body.imageUrl;

  if (!session) {
    return res.status(401).json({
      message: 'You need to login',
    });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        email: session.user.email,
      },
      { userImage },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(401).json({
        message: 'User not valid',
      });
    }
    return res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export default handler;
