import { Request, Response, NextFunction } from 'express';

type Role = 'ADMIN' | 'BASIC';

export const hasRole = (roles: Role[]) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const userRole = req.user?.data?.role;
    if (!roles.includes(userRole as Role)) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    return next();
  };
};
