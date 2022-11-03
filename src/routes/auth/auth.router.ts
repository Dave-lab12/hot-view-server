import express from 'express';

const authRouter = express.Router();

authRouter.get('/login', () => {
  return 'hi';
});
authRouter.post('/register', () => {
  return 'hi';
});

export default authRouter;
