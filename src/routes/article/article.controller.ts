import { Request, Response } from 'express';

import { CreateData } from '../../types/createArticle';
import {
  createArticleData,
  updateArticleData,
  getArticlesData,
  getArticleData,
  deleteArticleData,
} from '../../models/article';
import { UpdateData } from '../../types/updateArticle';

export async function httpCreateArticle(req: Request, res: Response) {
  const data: CreateData = req.body;
  const createdArticle = await createArticleData(data);

  if (!createdArticle.success) {
    return res
      .status(409)
      .json({ success: false, msg: createdArticle.message });
  }

  return res.status(200).json({ success: true, data: createdArticle });
}

export async function httpUpdateArticle(req: Request, res: Response) {
  const data: UpdateData = req.body;
  const updatedArticle = await updateArticleData(data);

  if (!updatedArticle.success) {
    return res
      .status(409)
      .json({ success: false, msg: updatedArticle.message });
  }

  return res.status(200).json({ success: true, data: { updatedArticle } });
}

export async function httpsGetArticles(req: Request, res: Response) {
  const articles = await getArticlesData();

  if (!articles.success) {
    return res.status(404).json({ success: false, message: articles.message });
  }
  return res.status(200).json({ success: true, data: articles.data });
}

export async function httpGetArticle(req: Request, res: Response) {
  const id = req.params.id;
  const article = await getArticleData(id);

  if (!article.success) {
    return res.status(404).json({ success: false, msg: article.message });
  }

  return res.status(200).json({ data: article });
}

export async function httpDeleteArticle(req: Request, res: Response) {
  const id = req.params.id;
  const deletedArticle = await deleteArticleData(id);
  if (!deletedArticle.success) {
    return res
      .status(404)
      .json({ success: false, msg: deletedArticle.message });
  }

  return res
    .status(200)
    .json({ success: true, msg: `Deleted ${deletedArticle} articles` });
}
