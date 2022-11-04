import type { Article } from "../../models/article";
import { db } from "../../utils/db.server";

export const getArticles = async () : Promise<Article[]> => {

    return db.article.findMany({
        select:{
            id:true,
            title:true,
            category_id: true,
            content: true,
            image_id: true,
            createdAt: true,
            view: true,

        }
    })
}

export const getArticle  = async (id:string) : Promise<Article | null> => {
    return db.article.findUnique({
        where: {
            id,
        }
    })
}

export const createArticles = async (article: Omit<Article,"id" >): Promise<Article> => {
    const {title, category_id, content, image_id, view} = article
    return db.article.create({
        data: {
            title,
            category_id,
            content,
            image_id,
            view,
        },
    })
}

export const updateArticle =async (article: Omit<Article, "id">, id: string ) => {
    const {title, content, image_id, view} = article
    return db.article.update({
        where: {
            id
        },
        data: {
            title,
            content,
            image_id,
            view,  
        }
    })
}

export const deleteArticle = async (id: string): Promise<void> => {
    
    await db.article.delete({
        where: {
            id
        }
    })
    
}

// export const getCategoryId = async (categoryName:string): Promise<String> => {
//     return db.category.firstUnique({
//         where: {
//             category_name: categoryName 
//         },
//         select:{
//             category_id: true
//         }
//     })
// }