import express from 'express';

const adminRouter = express.Router();

adminRouter.get('/dashboard', (req, res) => {
  // console.log(req.isAuthenticated());
  //   console.log(req.is);
  res.send('admin route');
});

export default adminRouter;
