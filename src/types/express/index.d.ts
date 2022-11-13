import { userSchema } from '../userSchema';

export {};

declare global {
  namespace Express {
    export interface User {
      data?: userSchema;
    }
  }
}
