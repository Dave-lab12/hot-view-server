import express from 'express';

import { validate } from '../../middleware/validate';
import { createUserSchema, loginUserSchema } from '../../schema/user.schema';

import { httpRegisterUser, httpLoginUser } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/login', validate(loginUserSchema), httpLoginUser);
authRouter.post('/register', validate(createUserSchema), httpRegisterUser);

export default authRouter;
