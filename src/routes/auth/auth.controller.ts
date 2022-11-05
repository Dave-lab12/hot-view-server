import { Request, Response } from 'express';

import { registerUserData, getUserData } from '../../models/auth';
import { RegisterData } from '../../types/registerUser';
import { LoginData } from '../../types/loginUser';
// export function httpRegisterUser(data: RegisterData) {
//   registerUserData(data);
// }
export async function httpRegisterUser(req: Request, res: Response) {
  const data: RegisterData = req.body;
  const registeredUser = await registerUserData(data);
  if (registeredUser.error) {
    return res
      .status(409)
      .json({ success: false, msg: registeredUser.message });
  }
  return res.status(200).json({ success: true, data: registeredUser });
}
export async function httpLoginUser(req: Request, res: Response) {
  const data: LoginData = req.body;
  const userResponse = await getUserData(data);

  if (userResponse.error) {
    return res
      .status(401)
      .json({ success: false, message: userResponse.message });
  }
  return res.status(200).json({ success: true, data: userResponse });
}
