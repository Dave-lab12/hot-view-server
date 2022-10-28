import 'dotenv';
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import createUser from './register';
import authenticate, {authenticateToken} from './authenticate';
import jwt, { Secret } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const prisma: PrismaClient = new PrismaClient();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get('/',authenticateToken, (req: Request, res: Response) => {
  return res.status(200).json({ message: 'hello world' });
});


app.post('/login', async (req: Request, res: Response) => {
    const user = await authenticate(req, res);
    if(!user){
      return res.status(401).json({message: "Not authorized"})
    } else{
      const accessToken  = jwt.sign(user.email, process.env.ACCESS_TOKEN_SECRET as Secret, {expiresIn: '15m'})
      const refreshToken  = jwt.sign(user.email, process.env.REFRESH as Secret, {expiresIn: '1d'})
      await prisma.user.update({where: {email: user.email}, data: {refreshToken: refreshToken}});

      res.cookie('jwt', refreshToken, {httpOnly:true, maxAge: 24 * 60 * 60 * 1000});
      res.json({accessToken});
    }
} )

app.post('/signup', async (req: Request, res: Response) => {
  const user = await createUser(req);  
  if(user){
    res.sendStatus(200)
  } else{
    res.sendStatus(500);
  }
})

export default app;
