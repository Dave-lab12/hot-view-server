import type { Article } from "../../models/article";
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

export const getArticles = async () : Promise<Article[]> => {

    return prisma.article.findMany({
        select:{
            id: true,
            title: true,
            content: true,
            category_id: true,
            image_id: true,
            view: true,
        },
    })
}

export const createArticles = async (article: Article) => {
    prisma.article.create({
        data: article
    })
}

export const updateArticle =async (article: Article ) => {
    return db.article.update({
        where: {
            id: article.id
        },
        data: {
            title: article.title,
            content: article.content,
            image_id: article.image_id,
            view: article.view,  
        }
    })
}

export const deleteArticle = async (artileId: string): Promise<Article> => {
    
    return db.article.delete({
        where: {
            id: artileId
        }
    })
    
}

export const getCategoryId =async (categoryName:string): Promise<String> => {
    return db.category.firstUnique({
        where: {
            category_name: categoryName 
        },
        select:{
            category_id: true
        }
    })
}