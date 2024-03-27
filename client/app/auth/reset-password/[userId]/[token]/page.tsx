'use client';

import { z } from 'zod';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useRequest from '@/hooks/useRequest';
import { toast } from '@/components/ui/use-toast';
import { ButtonLoading } from '@/components/button/LoadingButton';

import { zodResolver } from '@hookform/resolvers/zod';

import { PasswordResetValidation } from '@/lib/validation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const Register: React.FC = () => {
    const { userId, token } = useParams<{ userId: string; token: string }>();

    console.log(userId, token);

    // 1. Define your form.
    const form = useForm<z.infer<typeof PasswordResetValidation>>({
        resolver: zodResolver(PasswordResetValidation),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof PasswordResetValidation>) {
        setisSubmiting(true);
        doRequest(values);
    }

    const [isSubmiting, setisSubmiting] = useState(false);

    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: `/api/users/reset-password/${userId}/${token}`,
        method: 'post',
        body: {},
        onSuccess: () => {
            setisSubmiting(false);
            toast({
                description: 'Password Reset Successful',
            });
            router.push('/auth/login');
        },
    });

    return (
        <div className='flex flex-col items-center'>
            {errors}
            <div className='border border-grayBorder p-8 m-2 rounded-md shadow-md flex flex-col w-full sm:w-[400px] shadcn-bg-white shadcn-rounded-md'>
                <h3 className='text-2xl font-bold mb-10 text-center'>RESET PASSWORD</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full max-w-5xl'>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Password' type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Confirm Password' type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {isSubmiting ? <ButtonLoading /> : <Button className=' px-4 py-2 rounded-md'>Update</Button>}
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Register;
