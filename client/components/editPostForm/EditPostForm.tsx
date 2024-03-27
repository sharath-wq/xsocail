'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { PostValidation } from '@/lib/validation';
import useRequest from '@/hooks/useRequest';
import { useEffect, useState } from 'react';
import { toast } from '../ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { ButtonLoading } from '../button/LoadingButton';
import { PostData } from '@/types/post';
import axios, { AxiosError } from 'axios';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';

const EditPostForm = () => {
    const [isSubmiting, setisSubmiting] = useState(false);
    const router = useRouter();
    const { postId } = useParams();
    const [post, setPost] = useState<PostData | undefined>();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const { data } = await axios.get(`/api/posts/${postId}`);
                setPost(data);
            } catch (e) {
                const error = e as AxiosError;
            }
        };

        if (postId) {
            getPosts();
        }
    }, [postId]);

    // 1. Define your form with initial values.
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: '',
            tags: '',
        },
    });

    // 2. Update form values when post data is available.
    useEffect(() => {
        if (post) {
            form.setValue('caption', post.caption || '');
            form.setValue('tags', post.tags?.join(',') || '');
        }
    }, [post, form]);

    // 3. Define a submit handler.
    function onSubmit(values: z.infer<typeof PostValidation>) {
        setisSubmiting(true);
        doRequest(values);
    }

    const { doRequest, errors } = useRequest({
        url: `/api/posts/${postId}`,
        method: 'patch',
        body: {},
        onSuccess: () => {
            setisSubmiting(false);
            toast({
                description: 'Post Updated',
            });
            router.push('/home');
        },
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
                <div className='flex flex-col gap-3 py-10 justify-center items-center rounded-xl cursor-pointer border'>
                    {post?.imageUrls && post.imageUrls.length && (
                        <Carousel className='w-1/2'>
                            <CarouselContent>
                                {post.imageUrls.map((url, index) => (
                                    <CarouselItem key={index}>
                                        <div className='p-1'>
                                            <Card>
                                                <CardContent className='flex aspect-square items-center justify-center p-6'>
                                                    <img
                                                        src={url}
                                                        alt={`image-${index}`}
                                                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    )}
                </div>
                <FormField
                    control={form.control}
                    name='tags'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=''>Add Tags (seperated by comma ", ")</FormLabel>
                            <FormControl>
                                <Input type='text' className='' placeholder='React, Next, Tailwind' {...field} />
                            </FormControl>
                            <FormMessage className='' />
                        </FormItem>
                    )}
                />
                <div className='flex gap-4 items-center justify-end'>
                    <Button variant={'destructive'} type='button'>
                        Cancel
                    </Button>
                    {isSubmiting ? <ButtonLoading /> : <Button type='submit'>Update</Button>}
                </div>
            </form>
        </Form>
    );
};

export default EditPostForm;
