import bcrypt from 'bcryptjs';

import { User } from '@/models';
import { db } from './';
import bcryptjs from 'bcryptjs';

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

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

// Create o verify the oauth user
export const oAuthToDbUser = async (oAuthEmail: string, oAutName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
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
  await db.disconnect();

  const { _id, role, name, email } = newUser;

  return { _id, role, name, email };
};
