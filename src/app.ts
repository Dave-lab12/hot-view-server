import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import createUser from './register';
import type { User } from './register';

const users: User[] = [];

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'hello world' });
});

app.get('/login', (req:Request, res: Response) => {
  return res.status(200).json({users:users});
});

app.post('/login', (req: Request, res: Response) => {

} )

app.post('/signup', async (req: Request, res: Response) => {
  const user: User = createUser(req, res);
  users.push(user as User);
})

export default app;
