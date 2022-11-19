import express from 'express';
import passport from 'passport';

import { validate } from '../../middleware/validate';
import { createUserSchema, loginUserSchema } from '../../schema/user.schema';

import {
  httpRegisterUser,
  // httpLoginUser,
  httpLogoutUser,
} from './auth.controller';

const authRouter = express.Router();

// authRouter.post(
//   '/login',
//   validate(loginUserSchema),
//   (req: Request, res: Response) => {
//     passport.authenticate('local', (err, user, info) => {
//       console.log(err, info, user, req.statusCode);
//     });
//   }
//   // httpLoginUser
// );

authRouter.post(
  '/login',
  validate(loginUserSchema),
  function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      // console.log(err, user, info);
      if (err) return next(err);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(400).json(info);
      }
    })(req, res, next);
  }
  // httpLoginUser
);
authRouter.post('/register', validate(createUserSchema), httpRegisterUser);
authRouter.delete('/logout', httpLogoutUser);

export default authRouter;
