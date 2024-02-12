'use client';

import { z } from 'zod';
import Link from 'next/link';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import useRequest from '@/hooks/useRequest';
import { toast } from '@/components/ui/use-toast';
import { ButtonLoading } from '@/components/button/LoadingButton';

import { zodResolver } from '@hookform/resolvers/zod';

import { SignupValidation } from '@/lib/validation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const Register: React.FC = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            email: '',
            username: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof SignupValidation>) {
        setisSubmiting(true);
        doRequest(values);

        console.log(values);
    }

    const [isSubmiting, setisSubmiting] = useState(false);

    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: '/api/users',
        method: 'post',
        body: {},
        onSuccess: () => {
            setisSubmiting(false);
            toast({
                description: 'Register Successful',
            });
            router.push('/login');
        },
    });

    return (
        <div className='flex flex-col items-center'>
            {errors}
            <div className='border border-grayBorder p-8 m-2 rounded-md shadow-md flex flex-col w-full sm:w-[400px] shadcn-bg-white shadcn-rounded-md'>
                <h3 className='text-2xl font-bold mb-10 text-center'>REGISTER</h3>

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
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Username' type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='fullName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Full Name' type='text' {...field} />
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
                        {isSubmiting ? <ButtonLoading /> : <Button className=' px-4 py-2 rounded-md'>Signup</Button>}
                    </form>
                </Form>

                <div className='my-4 flex items-center'>
                    <div className='border-t flex-grow'></div>
                    <div className='mx-4'>or</div>
                    <div className='border-t flex-grow'></div>
                </div>

                <div className='flex items-center justify-center flex-col'>
                    <Button className='mr-2 flex gap-2'>
                        {' '}
                        <FcGoogle /> Signup with Google
                    </Button>
                </div>
            </div>

            <div className='border border-grayBorder p-6 m-2 rounded-md shadow-md w-full sm:w-[400px] text-center shadcn-bg-white'>
                <span className=''>
                    Already have an account?{' '}
                    <Link href='/auth/login' className='underline font-medium'>
                        Login
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Register;
