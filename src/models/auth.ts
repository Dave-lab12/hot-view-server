import config from 'config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { signJwt } from '../utils/jwt';
import { RegisterData } from '../types/registerUser';

interface LoginData {
  email: string;
  password: string;
}

const prisma = new PrismaClient();

export const getUserData = async (data: LoginData) => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return 'User not registered';
  }
  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword) return 'Invalid password';
  const accessToken = signJwt(
    { sub: user.id },
    { expiresIn: `${config.get('server.accessTokenExpiresIn')}` }
  );
  return { ...user, accessToken };
};
export const registerUserData = async (data: RegisterData) => {
  const { email, password, firstName, lastName, phoneNumber } = data;
  const hashedPassword = bcrypt.hashSync(password, 8);
  // console.log(email);
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        phoneNumber: phoneNumber ? phoneNumber : 0,
        password: hashedPassword,
      },
    });
    const accessToken = signJwt(newUser);
    return { newUser, accessToken };
  } catch (error) {
    return 'something went wrong';
  }
};
