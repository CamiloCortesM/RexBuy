import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { User } from '@/models';
import { jwt } from '@/utils';

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        email: string;
        role: string;
        name: string;
      };
    };

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'GET':
      return validateJWT(req, res);

    default:
      res.status(400).json({
        message: 'Bad request',
      });
  }
};

const validateJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies as { token: string };

  let userId = '';

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    res.status(401).json({
      message: 'Authorization token not valid',
    });
  }
  await db.connect();
  const user = await User.findById(userId);
  await db.disconnect();

  if (!user) {
    return res.status(400).json({
      message: 'No user exists with this id',
    });
  }

  const { email, role, name, _id } = user;

  res.status(200).json({
    token: jwt.signJWT(_id, email),
    user: {
      email,
      role,
      name,
    },
  });
};

export default handler;
