import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import config from '../config/default';

import './strategies/local';
import logger from './utils/logger';
import authRouter from './routes/auth/auth.router';
import adminRouter from './routes/admin/dashboard.router';
import { hasRole } from './middleware/hasRole';
import { articleRouter } from './routes/article/article.router';

// --------------------------initialization-------------------------------

const app: Express = express();
const THREE_SECOND = 100000;
const RedisStore = connectRedis(session);
const apiDocs = path.join(__dirname, '..', 'docs', 'api-docs.yml');
const swaggerDocument = YAML.load(apiDocs);
// console.log(YAML.load(apiDocs));

const redisClient = createClient({
  url: config.app.REDIS_URL,
  legacyMode: true,
});

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'logs', 'access.log'),
  { flags: 'a' }
);
dotenv.config();

// ---------------------------------middleware ---------------------------------
app.use(cors());
app.use(helmet());
app.use(
  morgan('combined', {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400,
  })
);

app.use(bodyParser.json());

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

redisClient.on('error', function (err) {
  logger.error(`Could not establish a connection with redis ⚠️. ${err}`);
  redisClient.disconnect();
});
redisClient.on('connect', function () {
  logger.info('Connected to redis successfully 🚀');
});
redisClient.connect();
app.get('/v1', (_req, res) => {
  res.send('Welcome');
});
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1/auth', authRouter);
app.use('/v1/admin', hasRole(['ADMIN']), adminRouter);
app.use('/v1/articles', articleRouter);

export default app;
