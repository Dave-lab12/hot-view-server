import { Request, Response, NextFunction } from 'express';

import { registerUserData, getUserData } from '../../models/auth';
import { RegisterData } from '../../types/registerUser';
import { LoginData } from '../../types/loginUser';

export async function httpRegisterUser(req: Request, res: Response) {
  const data: RegisterData = req.body;
  const registeredUser = await registerUserData(data);

  if (!registeredUser.success) {
    return res
      .status(409)
      .json({ success: false, message: registeredUser.message });
  }
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { success, ...userData } = registeredUser;
  return res.status(200).json({ success: true, data: userData.data });
}
export async function httpLoginUser(req: Request, res: Response) {
  const data: LoginData = req.body;
  const userResponse = await getUserData(data);

  if (!userResponse.success) {
    return res
      .status(401)
      .json({ success: false, message: userResponse.message });
  }
  return res.status(200).json({ success: true, data: userResponse.data });
}

export function httpLogoutUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).send({ success: true });
  });
}
