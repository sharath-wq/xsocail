'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import useRequest from '@/hooks/useRequest';
import { toast } from '@/components/ui/use-toast';
import { ButtonLoading } from '@/components/button/LoadingButton';

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    const [isSubmiting, setisSubmiting] = useState(false);

    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: '/api/users/login',
        method: 'post',
        body: {
            email: formData.email,
            password: formData.password,
        },
        onSuccess: () => {
            toast({
                description: 'Login successful',
            });
            router.push('/home');
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            email: formData.email ? '' : 'Email is required',
            password: formData.password ? '' : 'Password is required',
        };

        setFormErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === '')) {
            setisSubmiting(true);

            try {
                await doRequest();
                setisSubmiting(false);
            } catch (error) {
                setisSubmiting(false);
            }
        }
    };

    return (
        <div className='flex flex-col items-center'>
            {errors}
            <div className='border p-8 m-2 rounded-md shadow-xl flex flex-col w-full sm:w-[400px] shadcn-bg-white shadcn-rounded-md'>
                <h3 className='text-2xl font-bold mb-10 text-center'>LOGIN</h3>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <Input
                        type='text'
                        placeholder='Email'
                        className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                        value={formData.email}
                        name='email'
                        onChange={handleInputChange}
                    />
                    {formErrors.email && (
                        <span className='text-sm text-red-500 bottom-0 left-0 mt-1 ml-2'>{formErrors.email}</span>
                    )}
                    <Input
                        type='password'
                        placeholder='Password'
                        className='border rounded-md px-3 py-2 mb-4 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                        value={formData.password}
                        name='password'
                        onChange={handleInputChange}
                    />
                    {formErrors.password && (
                        <span className='text-sm text-red-500 bottom-0 left-0 mt-1 ml-2'>{formErrors.password}</span>
                    )}
                    {isSubmiting ? <ButtonLoading /> : <Button className=' px-4 py-2 rounded-md'>Login</Button>}

                    <div className='my-4 flex items-center'>
                        <div className='border-t  flex-grow'></div>
                        <div className='mx-4 '>or</div>
                        <div className='border-t  flex-grow'></div>
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <Button className='mr-2 flex gap-2'>
                            {' '}
                            <FcGoogle /> Login with Google
                        </Button>
                        <Link href='/auth/forgotpassword' className='text-gray-500 mt-4'>
                            Forgot Password
                        </Link>
                    </div>
                </form>
            </div>

            <div className='border p-6 m-2 rounded-md shadow-xl w-full sm:w-[400px] text-center shadcn-bg-white'>
                <span className=''>
                    Don't have an account?{' '}
                    <Link href='/auth/register' className='underline font-medium'>
                        Signup
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default LoginPage;
