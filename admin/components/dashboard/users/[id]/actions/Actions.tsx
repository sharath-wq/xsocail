'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import useRequest from '@/hooks/useRequest';
import { useState } from 'react';
import { ButtonLoading } from '@/components/button/ButtonLoading';
import { useUser } from '@/context/user.context';

const SingleUserProfileSchema = z.object({
    isBlocked: z.boolean().default(false).optional(),
});

export function Actions({ userId, isBlocked }: { userId: string; isBlocked: boolean }) {
    const [isSubmiting, setIsSubmiting] = useState<Boolean>();

    const form = useForm<z.infer<typeof SingleUserProfileSchema>>({
        resolver: zodResolver(SingleUserProfileSchema),
        defaultValues: {
            isBlocked: isBlocked,
        },
    });

    function onSubmit(data: z.infer<typeof SingleUserProfileSchema>) {
        setIsSubmiting(true);
        doRequest();
    }

    const { doRequest, errors } = useRequest({
        url: `/api/users/${form.getValues('isBlocked') ? 'block' : 'unblock'}/${userId}`,
        method: 'put',
        body: {},
        onSuccess: () => {
            setIsSubmiting(false);
            toast({
                description: 'User Updated',
            });
        },
        onError: () => {
            setIsSubmiting(false);
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
                {errors}
                <div>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='isBlocked'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                    <div className='space-y-0.5'>
                                        <FormLabel>Block User</FormLabel>
                                        <FormDescription>
                                            This will restrict the user form using his/her account
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                {isSubmiting ? <ButtonLoading /> : <Button type='submit'>Update</Button>}
            </form>
        </Form>
    );
}
