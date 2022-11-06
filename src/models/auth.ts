import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

import config from '../../config/default';
import { signJwt, verifyJwt } from '../utils/jwt';
import { RegisterData } from '../types/registerUser';
import { LoginData } from '../types/loginUser';

const prisma = new PrismaClient();

export const getUserData = async (data: LoginData) => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return { success: false, message: 'User not registered' };
  }
  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword) return { success: false, message: 'Invalid credentials' };
  const accessToken = signJwt(
    { sub: user.id },
    { expiresIn: `${config.app.accessTokenExpiresIn}` }
  );

  const userResult = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    phoneNumber: user.phoneNumber,
  };
  const token = verifyJwt(accessToken);
  if (!token.payload) return { success: false, message: token.expired };

  return {
    success: true,
    data: { ...userResult },
    token: token.payload,
    accessToken,
  };
};

export const registerUserData = async (data: RegisterData) => {
  const { email, password, firstName, lastName, phoneNumber } = data;
  const hashedPassword = bcrypt.hashSync(password, 8);
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
    const filteredNewUser = {
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
    };
    return { ...filteredNewUser, accessToken };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { success: false, message: 'Email already registered' };
      }
    }
    return { success: false, message: 'something went wrong' };
  }
};
