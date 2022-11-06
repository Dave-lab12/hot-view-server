import { Request, Response, NextFunction } from 'express';

import { verifyJwt } from '../utils/jwt';

function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return next();
  }

  const { payload } = verifyJwt(accessToken);

  if (payload) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = payload;
    next();
  }
  return next();
}

export default deserializeUser;
