/* eslint-disable no-process-env */
// const env = process.env.NODE_ENV; // 'dev' or 'test'
import dotenv from 'dotenv';

dotenv.config();

const dev = {
  app: {
    host: 'localhost',
    port: 8001,
    accessTokenExpiresIn: '1h',
    environment: {
      accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
      accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    },
  },
};
export default dev;
