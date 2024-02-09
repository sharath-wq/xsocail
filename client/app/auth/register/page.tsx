'use client';

import { ButtonLoading } from '@/components/button/LoadingButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useRequest from '@/hooks/useRequest';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [isSubmiting, setisSubmiting] = useState(false);

    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: '/api/users',
        method: 'post',
        body: {
            email: formData.email,
            username: formData.username,
            fullName: formData.fullName,
            password: formData.password,
        },
        onSuccess: () => {
            setisSubmiting(false);
            router.push('/auth/login');
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

        setisSubmiting(true);

        const newErrors = {
            email: formData.email ? '' : 'Email is required',
            fullName: formData.fullName ? '' : 'Full Name is required',
            username: formData.username ? '' : 'Username is required',
            password: formData.password ? '' : 'Password is required',
            confirmPassword: formData.confirmPassword === formData.password ? '' : 'Passwords do not match',
        };

        setFormErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === '')) {
            try {
                await doRequest();
                setisSubmiting(false);
            } catch (error) {
                setisSubmiting(false);
            }

            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [newErrors.confirmPassword]: newErrors.confirmPassword,
            }));
        }
    };

    return (
        <div className='flex flex-col items-center'>
            {errors}
            <div className='border border-grayBorder p-8 m-2 rounded-md shadow-md flex flex-col w-full sm:w-[400px] shadcn-bg-white shadcn-rounded-md'>
                <h3 className='text-2xl font-bold mb-10 text-center'>LOGO</h3>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <Input
                        type='text'
                        name='email'
                        placeholder='Email'
                        className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {formErrors.email && (
                        <span className='text-sm text-red-500 bottom-0 left-0 mt-1 ml-2'>{formErrors.email}</span>
                    )}
                    <Input
                        type='text'
                        name='fullName'
                        placeholder='Full Name'
                        className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                        value={formData.fullName}
                        onChange={handleInputChange}
                    />
                    {formErrors.fullName && (
                        <span className='text-sm text-red-500 bottom-0 left-0 mt-1 ml-2'>{formErrors.fullName}</span>
                    )}
                    <Input
                        type='text'
                        name='username'
                        placeholder='Username'
                        className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    {formErrors.username && (
                        <span className='text-sm text-red-500 bottom-0 left-0 mt-1 ml-2'>{formErrors.username}</span>
                    )}
                    <Input
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {formErrors.password && (
                        <span className='text-sm text-red-500 bottom-0 left-0 mt-1 ml-2'>{formErrors.password}</span>
                    )}
                    <Input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        className='border rounded-md px-3 py-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    {formErrors.confirmPassword && (
                        <span className='text-sm text-red-500 bottom-0 left-0 mt-1 ml-2'>{formErrors.confirmPassword}</span>
                    )}
                    {isSubmiting ? (
                        <ButtonLoading />
                    ) : (
                        <Button type='submit' className='m-4 px-4 py-2 rounded-md'>
                            Signup
                        </Button>
                    )}
                </form>

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
                    <Link href='/auth/login' className='text-blue-500'>
                        Login
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Register;
