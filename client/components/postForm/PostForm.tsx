'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import FileUploder from '../shared/FileUploder';
import { PostValidation } from '@/lib/validation';
import useRequest from '@/hooks/useRequest';
import { useState } from 'react';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { ButtonLoading } from '../button/LoadingButton';

const PostForm = ({ post }: any) => {
    const [isSubmiting, setisSubmiting] = useState(false);

    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : '',
            files: [],
            tags: post ? post.tags.join(',') : '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof PostValidation>) {
        setisSubmiting(true);
        doRequest(values);
    }

    const { doRequest, errors } = useRequest({
        url: '/api/posts',
        method: 'post',
        body: {},
        onSuccess: () => {
            setisSubmiting(false);
            toast({
                description: 'Post Created',
            });
            router.push('/home');
        },
        contentType: 'multipart/form-data',
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-9 w-full max-w-5xl '>
                <FormField
                    control={form.control}
                    name='caption'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=''>Caption</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Write something...' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='files'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=''>Add Photos</FormLabel>
                            <FormControl>
                                <FileUploder fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
                            </FormControl>
                            <FormMessage className='' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='tags'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=''>Add Tags</FormLabel>
                            <FormControl>
                                <Input type='text' className='' placeholder='#React #Next #Tailwind' {...field} />
                            </FormControl>
                            <FormMessage className='' />
                        </FormItem>
                    )}
                />
                <div className='flex gap-4 items-center justify-end'>
                    <Button variant={'destructive'} type='button'>
                        Cancel
                    </Button>
                    {isSubmiting ? <ButtonLoading /> : <Button type='submit'>Submit</Button>}
                </div>
            </form>
        </Form>
    );
};

export default PostForm;
