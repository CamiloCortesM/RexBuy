import bcrypt from 'bcryptjs';

import { User } from '@/models';
import { db } from './';

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password)) return null;

  const { role, name, _id } = user;

  return {
    _id,
    email: email.toLowerCase(),
    role,
    name,
  };
};

export const oAuthToDbUser = async (oAuthEmail: string, oAutName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    const { _id, role, name, email } = user;
    return { _id, role, name, email };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAutName,
    password: '@',
    role: 'client',
  });

  await newUser.save();

  const { _id, role, name, email } = newUser;

  return { _id, role, name, email };
};
