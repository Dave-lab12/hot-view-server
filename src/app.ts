import dotenv from 'dotenv';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

import './strategies/local';
import authRouter from './routes/auth/auth.router';
import adminRouter from './routes/admin/dashboard.route';
import { hasRole } from './middleware/hasRole';
import { articleRouter } from './routes/article/article.router';

const app: Express = express();

const THREE_SECOND = 30000;
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'superSecret',
    // store,
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: THREE_SECOND,
      secure: false,
      httpOnly: false,
      sameSite: false,
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('combined'));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', hasRole(['ADMIN']), adminRouter);
app.use('/api/v1/articles', articleRouter);
export default app;
