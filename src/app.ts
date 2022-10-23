import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'hello world' });
});

export default app;
