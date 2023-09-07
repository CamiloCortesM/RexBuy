import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';

import { db } from '@/database';
import { User } from '@/models';
import { validations } from '@/utils';

type Data =
  | { message: string }
  | {
      user: {
        email: string;
        role : string;
        name : string;
      };
    };

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      res.status(400).json({
        message: 'Bad request',
      });
  }
};

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    password = '',
    email = '',
    name = '',
  } = req.body as { password: string; email: string; name: string };

  if (password.length < 6) {
    return res.status(400).json({
      message: 'Incorrect password, should be more than 6 characters long',
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: 'Name is too short',
    });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: 'Invalid email',
    });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({
      message: 'Email in use',
    });
  }

  const newUser = new User({
    name,
    email: email.toLocaleLowerCase(),
    password: bcryptjs.hashSync(password),
    role: 'client',
  });

  const { role } = newUser;

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Talk to the administrator',
    });
  }

  res.status(200).json({
    user: {
      email,
      role,
      name,
    },
  });
};

export default handler;
