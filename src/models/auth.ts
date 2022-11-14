import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

// import config from '../../config/default';
// import { signJwt, verifyJwt } from '../utils/jwt';
import { RegisterData } from '../types/registerUser';
import { LoginData } from '../types/loginUser';

const prisma = new PrismaClient();

export const getUserDataFromId = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return { success: false, message: 'User not found' };
  }
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...userData } = user;
  return { success: true, data: userData };
};

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

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password: pass, ...userData } = user;
  return {
    success: true,
    data: { ...userData },
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
    // const accessToken = signJwt(newUser);
    const filteredNewUser = {
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
    };
    return { data: { ...filteredNewUser } };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { success: false, message: 'Email already registered' };
      }
    }
    return { success: false, message: 'Something went wrong' };
  }
};
