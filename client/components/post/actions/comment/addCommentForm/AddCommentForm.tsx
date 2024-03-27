'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import useRequest from '@/hooks/useRequest';
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@/context/userContext';

const commentSchema = z.object({
    content: z.string().min(2),
});

const AddCommentForm = ({
    postId,
    getComments,
    postAuthorId,
    handleNotification,
}: {
    postId: string;
    getComments: () => void;
    postAuthorId: string;
    handleNotification: (senderId: string, receiverId: string) => void;
}) => {
    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof commentSchema>) {
        try {
            doRequest(values);
        } catch (error: any) {
            toast({ title: 'Error posting comment', description: 'Try again later' });
        }
    }

    const { currentUser } = useUser();

    const { doRequest, errors } = useRequest({
        url: `/api/comments/${postId}`,
        method: 'post',
        body: {
            postAuthorId: postAuthorId,
        },
        onSuccess: () => {
            toast({
                description: 'Comment Added',
            });
            handleNotification(currentUser!.userId, postAuthorId);
            form.setValue('content', '');
            getComments();
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 relative'>
                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem className='relative flex items-center'>
                            <FormControl className='flex-1'>
                                <Input className='outline-none pr-12' placeholder='Add comment' {...field} />
                            </FormControl>
                            <Button type='submit' variant='ghost' className='ml-2 hover:bg-transparent'>
                                <Send />
                            </Button>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default AddCommentForm;
