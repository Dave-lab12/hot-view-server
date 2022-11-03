import type { Article } from "../../models/article";
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

export const getArticles = async () : Promise<Article[]> => {

    return prisma.News.findMany({
        select:{
            id:true,
            title: true,
            category_id:true,
            content: true,
            image_id: true,
            createdAt: true,    
        }
    })
}