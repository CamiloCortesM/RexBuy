import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import { IUser } from '@/interfaces';
import { User } from '@/models';
import { VALID_ROLES } from '@/constants';

type Data = { message: string } | IUser[];

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUsers(res);
    case 'PUT':
      return updateUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
const getUsers = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find().select('-password').lean();
  await db.disconnect();

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

  await db.connect();
  const user = await User.findById(userId);
  if (!user) {
    await db.disconnect();
    return res.status(404).json({ message: 'user not found with that id' });
  }

  user.role = role;
  await user.save();
  await db.disconnect();

  return res.status(200).json({ message: 'Updated user' });
};
