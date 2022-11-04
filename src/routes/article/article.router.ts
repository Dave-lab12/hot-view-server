import express from 'express'
import AppError from '../../utils/appError';
import type { Request, Response } from 'express';
import * as ArticleService from './article.service'
import { Article } from '../../models/article';

export const articleRouter = express.Router();

articleRouter.get('/', async (req: Request, res: Response) => {
    try{
        const articles = await ArticleService.getArticles();
        return res.status(200).json(articles);
    } catch(error: any){
        const appError = new AppError(error.message);
        return res.status(500).json(appError);
    }
})

articleRouter.get('/:id',async (req:Request, res: Response) => {
    const id = req.body.id
    
    try{
        const article = await ArticleService.getArticle(id);

        if(article){
            return res.status(200).json(article)
        } 

        return res.status(404).json("Article not Found")
    } catch(error: any){
        const appError = new AppError(error.message,404);
        return res.status(500).json(appError)
    }
})
    

articleRouter.post('/', () => {

})

articleRouter.put('/', () => {
    
})

articleRouter.delete('/', () => {

})