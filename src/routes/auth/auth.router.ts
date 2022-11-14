import express from 'express';
import passport from 'passport';

import { validate } from '../../middleware/validate';
import { createUserSchema, loginUserSchema } from '../../schema/user.schema';

import {
  httpRegisterUser,
  httpLoginUser,
  httpLogoutUser,
} from './auth.controller';

const authRouter = express.Router();

authRouter.post(
  '/login',
  validate(loginUserSchema),
  passport.authenticate('local'),
  httpLoginUser
);
authRouter.post('/register', validate(createUserSchema), httpRegisterUser);
authRouter.delete('/logout', httpLogoutUser);

export default authRouter;
