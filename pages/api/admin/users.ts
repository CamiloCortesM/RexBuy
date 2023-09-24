import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import { IUser } from '@/interfaces';
import { User } from '@/models';
import { VALID_ROLES } from '@/constants';

type Data = { message: string } | IUser[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  switch (req.method) {
    case 'GET':
      return getUsers(res);
    case 'PUT':
      return updateUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
};
const getUsers = async (res: NextApiResponse<Data>) => {
  const users = await User.find().select('-password').lean();

  return res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '', role = '' } = req.body;

  if (!isValidObjectId(userId))
    return res.status(400).json({ message: 'No user exists for this id' });

  if (!VALID_ROLES.includes(role)) {
    return res
      .status(400)
      .json({ message: 'role not allowed: ' + VALID_ROLES.join(', ') });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'user not found with that id' });
  }

  user.role = role;
  await user.save();

  return res.status(200).json({ message: 'Updated user' });
};

export default handler;
