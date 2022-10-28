import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';

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

function authenticateToken(req: Request, res: Response, next: Function){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err) => {
        if(err) return res.sendStatus(403);
        next();
    })
}

export default authenticate;
export {authenticateToken};