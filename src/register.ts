import {Response, Request} from 'express';
import bcrypt from 'bcrypt';

class User{
    public username: String;
    public password: String;

    constructor(username:String, password: String){
        this.username = username;
        this.password = password;
    }
  }

async function createUser(req: Request, res: Response): Promise<User>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user: User = new User(req.body.email, hashedPassword);
        return user;
    } catch{
        const user: User = new User('', '');
        return user;
      }
}

export default createUser;
export {User};