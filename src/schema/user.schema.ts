import { z } from 'zod';

export const createUserSchema = z.object({
  body: z
    .object({
      firstName: z.string({ required_error: 'first name is required' }),
      lastName: z.string({ required_error: 'last name is required' }),
      email: z
        .string({ required_error: 'last name is required' })
        .email('Invalid email'),
      password: z
        .string({ required_error: 'last name is required' })
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
      passwordConfirm: z.string({
        required_error: 'Please confirm your password',
      }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: 'passwords do not match',
    }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email or password'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Invalid email or password'),
  }),
});

// export type CreateUserInput = TypeOf<typeof createUserSchema="">['body'];
// export type LoginUserInput = TypeOf<typeof loginUserSchema="">['body'];
// export type CreateUserInput = z.infer<typeof createUserSchema>;
// export type LoginUserInput = z.infer<typeof loginUserSchema>;
// export default { createUserSchema, loginUserSchema };
