import { object, string, z } from 'zod';

export const createArticleSchema = object({
  body: object({
    title: string({ required_error: 'Title is required' }),
    category_id: string({ required_error: 'Category_id is required' }),
    content: string({ required_error: 'Content is required' }),
  }),
});

export const updateArticleSchema = object({
  body: object({
    title: string().optional(),
    category_id: string().optional(),
    content: string().optional(),
    image_id: string().optional(),
  }).superRefine((data, ctx) => {
    const { title, category_id, content, image_id } = data;
    const hasNoInput = !(
      title !== undefined ||
      category_id !== undefined ||
      content !== undefined ||
      image_id !== undefined
    );
    if (hasNoInput) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'There must be at least on input',
      });
    }
  }),
});
