import {Response, Request} from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function createUser(req: Request, res: Response){

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            phonenumber:Number.parseInt(req.body.phone)
        };
        prisma.user.create({
            data:user,
        })
        return user;
    } catch{
        return null;
      }
}

export default createUser;