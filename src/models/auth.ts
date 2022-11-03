import config from 'config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { signJwt } from '../utils/jwt';

const prisma = new PrismaClient();
export const getUserData = async (data: any) => {
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
