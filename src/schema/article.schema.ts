import { object, string, z } from 'zod';

export const createArticleSchema = object({
    body: object({
      title: string({required_error: 'Title is required'}),
      category_id: string({required_error: 'Category_id is required'}),
      content: string({required_error: 'Content is required'})
    })
  })

export const updateArticleSchema = object({
    body: object({
        title: string({}),
        category_id:string(),
        content: string(),
        image_id: string(),
    }).superRefine((data, ctx) => {
        const {title, category_id, content, image_id} = data
        let hasNoInput = !(title !== undefined ||
                            category_id !== undefined ||
                            content !== undefined ||
                            image_id !== undefined)
        if(hasNoInput){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "There must be at least on input"
            })
        }
    })
})  

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;
export type UpdateArticleSchema = z.infer<typeof updateArticleSchema>;
