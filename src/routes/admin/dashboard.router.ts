import express from 'express';

import { validate } from '../../middleware/validate';
import {
  createArticleSchema,
  updateArticleSchema,
} from '../../schema/article.schema';
import {
  httpCreateArticle,
  httpUpdateArticle,
  httpDeleteArticle,
} from '../article/article.controller';

const adminRouter = express.Router();

adminRouter.get('/dashboard', (req, res) => {
  res.json({ success: true, data: 'admin' });
});

adminRouter.post('/articles', validate(createArticleSchema), httpCreateArticle);
adminRouter.patch(
  '/articles:id',
  validate(updateArticleSchema),
  httpUpdateArticle
);
adminRouter.delete('/articles:id', httpDeleteArticle);

export default adminRouter;
