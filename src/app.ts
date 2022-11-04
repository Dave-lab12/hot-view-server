import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import jwt, { Secret } from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';

import createUser from './register';
import authRouter from './routes/auth/auth.router';
// import authenticate, { authenticateToken } from './authenticate';

const app: Express = express();
// const prisma: PrismaClient = new PrismaClient();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use('/api/v1/auth', authRouter);

// app.get('/', authenticateToken, (req: Request, res: Response) => {
//   return res.status(200).json({ message: 'hello world' });
// });

// app.post('/login', async (req: Request, res: Response) => {
//   const user = await authenticate(req, res);
//   if (!user) {
//     return res.status(401).json({ message: 'Not authorized' });
//   } else {
//     const accessToken = jwt.sign(
//       user.email,
//       process.env.ACCESS_TOKEN_SECRET as Secret,
//       { expiresIn: '15s' }
//     );
//     const refreshToken = jwt.sign(
//       user.email,
//       process.env.REFRESH_TOKEN_SECRET as Secret,
//       { expiresIn: '1d' }
//     );
//     await prisma.user.update({
//       where: { email: user.email },
//       data: { refreshToken },
//     });

//     return res.status(200).json({
//       message: 'Login succesfful',
//       token: accessToken,
//       userInfo: {
//         id: user.id,
//         refreshToken: user.refreshToken,
//       },
//     });
//   }
// });

app.post('/signup', async (req: Request, res: Response) => {
  const user = await createUser(req);
  if (user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

export default app;
