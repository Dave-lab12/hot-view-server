import express from 'express'
import AppError from '../../utils/appError';
import type { Request, Response } from 'express';
import * as ArticleService from './article.service'
import { validate } from '../../middleware/validate';
import { createArticleSchema, updateArticleSchema } from '../../schema/article.schema';
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
    const id = req.params.id
    
    try{
        const article = await ArticleService.getArticle(id);
        
        if(article){
            return res.status(200).json(article)
        } 

        return res.status(404).json({status: "Article not Found"})
    } catch(error: any){
        const appError = new AppError(error.message,404);
        
        return res.status(500).json(appError)
    }
})
    

articleRouter.post('/', validate(createArticleSchema) ,async (req: Request, res: Response) => {
    try{
        const article = req.body
        const newArticle = await ArticleService.createArticles(article)
        return res.status(201).json(newArticle)
    } catch(error: any){
        const appError = new AppError(error.message)        
        return res.status(500).json(appError)
        
    }
})

articleRouter.put('/:id', validate(updateArticleSchema), async (req: Request, res: Response) => {
    const id: string = req.params.id
    try{
        const article = req.body
        const updatedArticle = await ArticleService.updateArticle(article, id);
        return res.status(200).json(updatedArticle);
    } catch(error: any){
        const appError = new AppError(error.message)
        return res.status(500).json(appError)
    }

})

articleRouter.delete('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id
    
    try{
        await ArticleService.deleteArticle(id);
        return res.status(204).json({status:"Article succesfully deleted"})
    } catch(error: any){
        const appError = new AppError(error.message)
        return res.status(500).json(appError)
    }
})