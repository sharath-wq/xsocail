import * as z from 'zod';

export const SignupValidation = z
    .object({
        fullName: z.string().min(4, { message: 'Name must be at least 4 characters.' }),
        username: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
        email: z.string().email(),
        password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export const PostValidation = z.object({
    caption: z.string().min(5, { message: 'Minimum 5 characters.' }).max(2200, { message: 'Maximum 2,200 caracters' }),
    files: z.custom<File[]>(),
    tags: z.string(),
});

export const ForgotPasswordValiation = z.object({
    email: z.string().email(),
});
