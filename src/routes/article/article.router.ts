import express from 'express';

import { httpGetArticle, httpsGetArticles } from './article.controller';

export const articleRouter = express.Router();

articleRouter.get('/', httpGetArticle);

articleRouter.get('/:id', httpsGetArticles);
