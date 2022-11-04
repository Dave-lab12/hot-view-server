import { registerUserData } from '../../models/auth';
import { RegisterData } from '../../types/registerUser';

export function httpRegisterUser(data: RegisterData) {
  registerUserData(data);
}
// export function httpLoginUser() {}
