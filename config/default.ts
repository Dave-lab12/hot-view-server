/* eslint-disable no-process-env */
// const env = process.env.NODE_ENV; // 'dev' or 'test'
import dotenv from 'dotenv';

dotenv.config();

const dev = {
  app: {
    host: 'localhost',
    port: process.env.PORT || 8001,
  },
  test: {
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
  },
};
export default dev;
