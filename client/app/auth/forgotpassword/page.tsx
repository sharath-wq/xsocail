'use client';

import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ForgotPasswordValiation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ButtonLoading } from '@/components/button/LoadingButton';
import { useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { toast } from '@/components/ui/use-toast';

const ForgotPage: React.FC = () => {
    const [isSubmiting, setisSubmiting] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof ForgotPasswordValiation>>({
        resolver: zodResolver(ForgotPasswordValiation),
        defaultValues: {
            email: '',
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof ForgotPasswordValiation>) {
        setisSubmiting(true);
        await doRequest(values);
    }

    const { doRequest, errors } = useRequest({
        url: '/api/users/reset-password',
        method: 'post',
        body: {},
        onSuccess: () => {
            setisSubmiting(false);
            toast({
                description: 'Email Send successful',
            });
        },
    });

    return (
        <div className='flex flex-col items-center'>
            {errors}
            <div className='border  p-8 m-2 rounded-md shadow-md flex flex-col w-full sm:w-[400px] shadcn-bg-white shadcn-rounded-md'>
                <h3 className='text-2xl font-bold mb-10 text-center'>LOGO</h3>

                <p className='text-gray-600 mb-4 text-center'>
                    Enter your email and we&apos;ll send you a link to get back into your account.
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full max-w-5xl'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Email' type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {isSubmiting ? (
                            <ButtonLoading />
                        ) : (
                            <Button className='px-4 py-4 mt-4 rounded-md mb-4'>Send Login Link</Button>
                        )}
                    </form>
                </Form>

                <div className='flex items-center justify-center'>
                    <Button variant={'outline'} asChild className='w-full'>
                        <Link href='#'>Back to Login</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPage;
