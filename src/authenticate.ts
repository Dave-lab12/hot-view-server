import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

async function authenticate (req: Request, res: Response){
    const user = await prisma.user.findUnique({where:{email: req.body.email}});

    if(user){
        try{
            const isAuthenticated = await bcrypt.compare(req.body.password, user.password);
            if(isAuthenticated) return user;
        } catch{

        }
}
    return null;
}

export default authenticate;