import type { Article } from "../../models/article";
import { PrismaClient } from '@prisma/client';
import { db } from "../../utils/db.server";

export const getArticles = async () : Promise<Article[]> => {

    return db.article.findMany({
        select:{
            id: true,  
            title: true,
            content: true,
            category_id: true,
            createdAt: true,
            image_id: true,
            view: true,
        },
    });
}

export const createArticles = async (article: Article): Promise<Article> => {
    return db.article.create({
        data: {
            title: article.title,
            content: article.content,
            category_id: article.category_id,
            image_id: article.image_id,
            view: article.view,
        },
    })
}

export const getArticle =async (id: string): Promise<Article | null> => {
    return db.article.findUnique({
        where: {
            id: id
        }
    })
}

export const updateArticle =async (article: Article ) => {
    return db.article.update({
        where: {
            id: article.id
        },
        data: {
            title: article.title,
            category_id: article.category_id,
            content: article.content,
            image_id: article.image_id,
            view: article.view,  
        }
    })
}