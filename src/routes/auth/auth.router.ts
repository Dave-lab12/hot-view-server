import express from 'express';

import { validate } from '../../middleware/validate';
import { createUserSchema, loginUserSchema } from '../../schema/user.schema';

import {
  httpRegisterUser,
  httpLoginUser,
  httpLogoutUser,
} from './auth.controller';

const authRouter = express.Router();

authRouter.post('/login', validate(loginUserSchema), httpLoginUser);
authRouter.post('/register', validate(createUserSchema), httpRegisterUser);
authRouter.delete('/logout', httpLogoutUser);

export default authRouter;
