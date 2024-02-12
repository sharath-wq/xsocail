import * as z from 'zod';

export const PostValidation = z.object({
    caption: z.string().min(5, { message: 'Minimum 5 characters.' }).max(2200, { message: 'Maximum 2,200 caracters' }),
    file: z.custom<File[]>(),
    tags: z.string(),
});
