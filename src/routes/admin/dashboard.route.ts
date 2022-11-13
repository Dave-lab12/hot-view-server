import express from 'express';

const adminRouter = express.Router();

adminRouter.get('/dashboard', (req, res) => {
  res.send('admin route');
});

export default adminRouter;
