import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { getServerSession } from 'next-auth';
import authOptions from '@/pages/api/auth/[...nextauth]';
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
  await db.connect();
  switch (req.method) {
    case 'POST':
      return await editNameUser(req, res);

    default:
      return res.status(400).json({
        message: 'Bad Request',
      });
  }
};

const editNameUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session: any = await getServerSession(req, res, authOptions);
  const { name } = req.body;

  if (!session) {
    return res.status(401).json({
      message: 'You need to login',
    });
  }

  if (!name || name.length < 3) {
    return res.status(400).json({
      message: 'Name not valid',
    });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { name },
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
