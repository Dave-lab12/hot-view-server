import dotenv from 'dotenv';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import authRouter from './routes/auth/auth.router';

const app: Express = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use('/api/v1/auth', authRouter);

export default app;
