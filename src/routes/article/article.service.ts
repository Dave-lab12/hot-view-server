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

// export const createArticles = async (article: Article): Promise<Article> => {
//     return db.article.create({
//         data: {
//             title: article.title,
//             content: article.content,
//             image_id: article.image_id,
//             view: article.view
//         }
//     })
// }

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

// export const deleteArticle = async (artileId: string): Promise<Article> => {
    
//     return db.article.delete({
//         where: {
//             artileId
//         }
//     })
    
// }

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