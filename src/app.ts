import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'hello world' });
});

export default app;
