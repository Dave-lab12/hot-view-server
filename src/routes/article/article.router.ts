import express from 'express';

import { httpGetArticle, httpsGetArticles } from './article.controller';

export const articleRouter = express.Router();

articleRouter.get('/', httpsGetArticles);

articleRouter.get('/:id', httpGetArticle);
