'use client';

import { z } from 'zod';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import useRequest from '@/hooks/useRequest';
import { toast } from '@/components/ui/use-toast';
import { ButtonLoading } from '@/components/button/LoadingButton';

import { zodResolver } from '@hookform/resolvers/zod';

import { SigninValidation } from '@/lib/validation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import GoogleBtn from '@/components/googleButton/GoogleBtn';
import { useUser } from '@/context/userContext';
import Comment from '@/components/post/actions/comment/Comment';
import { Loader } from 'lucide-react';

const LoginPage: React.FC = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof SigninValidation>) {
        setisSubmiting(true);
        doRequest(values);
    }

    const [isSubmiting, setisSubmiting] = useState(false);

    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: '/api/users/login',
        method: 'post',
        body: {},
        onSuccess: () => {
            setisSubmiting(false);
            toast({
                description: 'Login successful',
            });
            getCurrentUser();
            router.replace('/home');
        },
        onError: () => {
            setisSubmiting(false);
        },
    });

    const { currentUser, getCurrentUser } = useUser();

    useEffect(() => {
        if (currentUser) {
            router.replace('/home');
        }
    }, [currentUser, router]);

    return currentUser ? (
        <div className='w-full h-screen flex justify-center items-center'>
            <Loader className='animate-spin' />
        </div>
    ) : (
        <div className='flex flex-col items-center'>
            {errors}
            <div className='border p-8 m-2 rounded-md shadow-xl flex flex-col w-full sm:w-[400px] shadcn-bg-white shadcn-rounded-md'>
                <h3 className='text-2xl font-bold mb-10 text-center'>LOGIN</h3>

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

                <div className='my-4 flex items-center'>
                    <div className='border-t  flex-grow'></div>
                    <div className='mx-4 '>or</div>
                    <div className='border-t  flex-grow'></div>
                </div>

                <div className='flex items-center justify-center flex-col'>
                    <GoogleBtn text={'Login with Google'} icon={<FcGoogle />} />
                    <Link href='/auth/forgotpassword' className='text-gray-500 mt-4'>
                        Forgot Password
                    </Link>
                </div>
            </div>

            <div className='border flex flex-col p-6 m-2 rounded-md shadow-xl w-full sm:w-[400px] text-center shadcn-bg-white'>
                <span className=''>
                    Don't have an account?{' '}
                    <Link href='/auth/register' className='underline font-medium'>
                        Signup
                    </Link>
                </span>
                {errors && (
                    <Link href='/auth/verify' className='text-gray-500 mt-4'>
                        Not Verified? verify now.
                    </Link>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
