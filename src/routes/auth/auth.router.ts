import express, { Request } from 'express';

import { httpRegisterUser } from './auth.controller';

const authRouter = express.Router();

authRouter.get('/login', () => {
  return 'hi';
});
authRouter.post('/register', (req: Request) => {
  // console.log(req.body);
  httpRegisterUser(req.body);
  return 'hi';
});

export default authRouter;
