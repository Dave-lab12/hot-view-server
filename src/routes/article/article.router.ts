import express from 'express'
import AppError from '../../utils/appError';
import type { Request, Response } from 'express';
import * as ArticleService from './article.service'
import { Article } from '../../models/article';

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

<<<<<<< HEAD
articleRouter.get('/articles:id',async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try{
        const article = await ArticleService.getArticle(id);   
        if(article){
            return res.status(200).json(article);
        }     

        return res.status(404).json("Article not found")
        
    } catch(error: any){
        const appError = new AppError(error.message);
        return res.status(500).json(appError)
    }
})

articleRouter.post('/articles', async (req: Request, res: Response) => {
    const article : Article = {
        title: req.body.title,
        category_id: 
    }
=======
articleRouter.post('/articles', () => {

>>>>>>> parent of 8987a7e (Feat: Getting a single article method implemented)
})

articleRouter.put('/articles', () => {
    
})

articleRouter.delete('/articles', () => {

})