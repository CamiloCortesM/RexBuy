import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import { IUser } from '@/interfaces';
import { User } from '@/models';

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
  const { userId = '', newRole = '' } = req.body;

  if (!isValidObjectId(userId))
    return res.status(400).json({ message: 'No user exists for this id' });

  const validRoles = ['admin', 'client', 'employee'];
  if (!validRoles.includes(newRole)) {
    return res
      .status(400)
      .json({ message: 'role not allowed: ' + validRoles.join(', ') });
  }

  await db.connect();
  const user = await User.findById(userId);
  if (!user) {
    await db.disconnect();
    return res.status(404).json({ message: 'user not found with that id' });
  }

  user.role = newRole;
  await user.save();
  await db.disconnect();

  return res.status(200).json({ message: 'Updated user' });
};
