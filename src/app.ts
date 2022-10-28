import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import createUser from './register';

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'hello world' });
});

app.get('/login', (req:Request, res: Response) => {

    

});

app.post('/login', (req: Request, res: Response) => {

} )

app.post('/signup', async (req: Request, res: Response) => {
  const user = await createUser(req);  
  if(user){
    return res.status(200).json({user: user})
  } else{
    return res.status(500).redirect('/login');
  }
})

export default app;
