import { object, string, z } from 'zod';

export const createArticleSchema = object({
  body: object({
    title: string({ required_error: 'Title is required' }),
    categoryId: string({ required_error: 'CategoryId is required' }),
    content: string({ required_error: 'Content is required' }),
  }),
});

export const updateArticleSchema = object({
  body: object({
    title: string().optional(),
    categoryId: string().optional(),
    content: string().optional(),
    image_id: string().optional(),
  }).superRefine((data, ctx) => {
    const { title, categoryId, content, image_id } = data;
    const hasNoInput = !(
      title !== undefined ||
      categoryId !== undefined ||
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
