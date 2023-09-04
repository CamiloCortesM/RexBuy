import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';

import { db } from '@/database';
import { User } from '@/models';

type Data =
  | { message: string }
  | {
      user: {
        email: string;
        role: string;
        name: string;
      };
    };

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      return loginUser(req, res);

    default:
      res.status(400).json({
        message: 'Bad request',
      });
  }
};

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { password = '', email = '' } = req.body as {
    password: string;
    email: string;
  };

  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return res.status(400).json({
      message: 'Email or password invalid',
    });
  }

  if (!bcryptjs.compareSync(password, user.password!)) {
    return res.status(400).json({
      message: 'Email or password invalid',
    });
  }

  const { role, name } = user;

  res.status(200).json({
    user: {
      email,
      role,
      name,
    },
  });
};

export default handler;
