/* eslint-disable no-process-env */
// const env = process.env.NODE_ENV; // 'dev' or 'test'
import dotenv from 'dotenv';

dotenv.config();

const dev = {
  app: {
    host: 'localhost',
    port: 8001,
    REDIS_URL: process.env.REDIS_URL,
  },
};
export default dev;
