'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginValidation } from '@/lib/validation';
import useRequest from '@/hooks/useRequest';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { ButtonLoading } from '@/components/button/ButtonLoading';
import { useUser } from '@/context/user.context';

const LoginForm = () => {
    const [isSubmiting, setisSubmiting] = useState(false);
    const { currentUser, getCurrentUser } = useUser();

    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof LoginValidation>>({
        resolver: zodResolver(LoginValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof LoginValidation>) {
        setisSubmiting(true);
        doRequest(values);
    }

    const { doRequest, errors } = useRequest({
        url: '/api/users/login',
        method: 'post',
        body: {},
        onSuccess: () => {
            setisSubmiting(false);
            getCurrentUser();

            if (currentUser && !currentUser.isAdmin) {
                toast({
                    description: 'You are not Authorized',
                });
                return;
            }

            if (currentUser && currentUser.isAdmin) {
                toast({
                    description: 'Login successful',
                });
                router.replace('/dashboard');
            }
        },
        onError: () => {
            setisSubmiting(false);
        },
    });

    return (
        <div className='border p-8 m-2 rounded-md shadow-xl flex flex-col w-full sm:w-[400px] shadcn-bg-white shadcn-rounded-md'>
            <h3 className='text-2xl font-bold mb-10 text-center'>ADMIN</h3>
            {errors}
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
                    {isSubmiting ? <ButtonLoading /> : <Button className=' px-4 py-2 rounded-md'>Login</Button>}
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;
