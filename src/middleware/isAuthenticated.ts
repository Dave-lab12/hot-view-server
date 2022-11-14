import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    res.status(403).json({
      success: false,
      message: 'the operation requires authentication',
    });
  }
  next();
};
