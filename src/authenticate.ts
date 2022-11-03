import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

const prisma: PrismaClient = new PrismaClient();
dotenv.config();

async function authenticate(req: Request, res: Response) {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (user) {
    try {
      const isAuthenticated = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isAuthenticated) return user;
    } catch {}
  }
  return null;
}

function authenticateToken(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Not authorized' });

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (err: any, decoded: any) => {
      if (err)
        return res.status(403).json({ message: err.message, error: err });
      res.locals.jwt = decoded;
      next();
    }
  );
}

export default authenticate;
export { authenticateToken };
