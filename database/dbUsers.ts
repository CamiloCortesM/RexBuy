import bcrypt from 'bcryptjs';

import { User } from '@/models';
import { db } from './';

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email }).lean();

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password)) return null;

  const { password: userPassword, updatedAt, createdAt, __v, ...rest } = user;

  return {
    ...rest,
  };
};

export const oAuthToDbUser = async (
  oAuthEmail: string,
  oAutName: string,
  image: string
) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail }).lean();

  if (user) {
    const { password, updatedAt, createdAt, __v, ...rest } = user;
    return {
      ...rest,
    };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAutName,
    password: '@',
    role: 'client',
    userImage: image,
  });

  await newUser.save();

  const {
    _id,
    name,
    email,
    role,
    userImage,
    department,
    city,
    address,
    cellphone,
  } = newUser;
  return {
    _id,
    name,
    email,
    role,
    userImage,
    department,
    city,
    address,
    cellphone,
  };
};

export const updateUserInformation = async (email: string) => {
  await db.connect();

  const user = await User.findOne({ email });
  if (!user) return;

  return { user };
};
