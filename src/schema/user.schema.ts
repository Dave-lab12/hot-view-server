import { object, string, z } from 'zod';

export const createUserSchema = object({
  body: object({
    firstName: string({ required_error: 'first name is required' }),
    lastName: string({ required_error: 'last name is required' }),
    email: string({ required_error: 'last name is required' }).email(
      'Invalid email'
    ),
    password: string({ required_error: 'last name is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({ required_error: 'Please confirm your password' }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'passwords do not match',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email or password'
    ),
    password: string({ required_error: 'Password is required' }).min(
      8,
      'Invalid email or password'
    ),
  }),
});

// export type CreateUserInput = TypeOf<typeof createUserSchema="">['body'];
// export type LoginUserInput = TypeOf<typeof loginUserSchema="">['body'];
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
