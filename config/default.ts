/* eslint-disable no-process-env */
// const env = process.env.NODE_ENV; // 'dev' or 'test'
import dotenv from 'dotenv';

dotenv.config();

const dev = {
  app: {
    host: 'localhost',
    port: process.env.SERVER_PORT || 8001,
    REDIS_URL: `${process.env.REDIS_HOST}://${process.env.REDIS_USER}:${process.env.REDIS_PORT}`,
    NODE_ENV: process.env.NODE_ENV,
  },
};

export default dev;
