import {Response, Request} from 'express';
import bcrypt from 'bcrypt';

interface User {
     username: String;
     password: String;
  }

async function createUser(req: Request, res: Response): Promise<User | null>{

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user: User = {
            username: req.body.email,
            password: hashedPassword
        };
        return user;
    } catch{
        return null;
      }
}

export default createUser;