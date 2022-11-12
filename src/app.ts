import dotenv from 'dotenv';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import connectPgSimple from 'connect-pg-simple';
import passport from 'passport';
import session from 'express-session';

import './strategies/local';
import authRouter from './routes/auth/auth.router';
import adminRouter from './routes/admin/dashboard.route';

const app: Express = express();
const store = new (connectPgSimple(session))({ createTableIfMissing: true });
const THREE_SECOND = 30000;
dotenv.config();
app.use(bodyParser.json());
app.use(
  session({
    secret: 'superSecret',
    store,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: THREE_SECOND,
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('combined'));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
export default app;
