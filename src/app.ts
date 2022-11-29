import dotenv from 'dotenv';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';

import config from '../config/default';

import './strategies/local';
import authRouter from './routes/auth/auth.router';
import adminRouter from './routes/admin/dashboard.route';
import { hasRole } from './middleware/hasRole';
import { articleRouter } from './routes/article/article.router';

const app: Express = express();

app.set('trust proxy', 1);
const THREE_SECOND = 100000;
const RedisStore = connectRedis(session);

const redisClient = createClient({
  url: config.app.REDIS_URL,
  legacyMode: true,
});

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

redisClient.on('error', function (err) {
  // eslint-disable-next-line no-console
  console.log(`Could not establish a connection with redis ⚠️. ${err}`);
});
redisClient.on('connect', function () {
  // eslint-disable-next-line no-console
  console.log('Connected to redis successfully 🚀');
});
redisClient.connect();

app.use(
  session({
    secret: 'superSecret',
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    resave: true,
    name: 'sessionId',
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
