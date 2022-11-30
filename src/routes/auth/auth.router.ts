import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { validate } from '../../middleware/validate';
import { createUserSchema, loginUserSchema } from '../../schema/user.schema';

import { httpRegisterUser, httpLogoutUser } from './auth.controller';

const authRouter = express.Router();

authRouter.post(
  '/login',
  validate(loginUserSchema),
  function (req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ success: false, data: info });
      }
      return req.logIn(user, function (error) {
        if (error) {
          return next(error);
        }
        return res.send({ success: true, data: user.data });
      });
    })(req, res, next);
  }
);
authRouter.post('/register', validate(createUserSchema), httpRegisterUser);
authRouter.delete('/logout', httpLogoutUser);

export default authRouter;
