import express from 'express'
import AppError from '../../utils/appError';
import type { Request, Response } from 'express';
import * as ArticleService from './article.service'

export const articleRouter = express.Router();

articleRouter.get('/articles', async (req: Request, res: Response) => {
    try{
        const articles = await ArticleService.getArticles();
        return res.status(200).json(articles);
    } catch(error: any){
        const appError = new AppError(error.message);
        return res.status(500).json(appError);
    }
})

articleRouter.post('/articles', () => {

})

articleRouter.put('/articles', () => {
    
})

articleRouter.delete('/articles', () => {

})