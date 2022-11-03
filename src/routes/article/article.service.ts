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

export const updateArticle =async (articleId: String, columnName: String, updateData: unknown ) => {
    
}