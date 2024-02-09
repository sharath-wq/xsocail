import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginPage: React.FC = () => {
    return (
        <div className='flex flex-col items-center'>
            <div className='border p-8 m-2 rounded-md shadow-xl flex flex-col w-full sm:w-[400px] shadcn-bg-white shadcn-rounded-md'>
                <h3 className='text-2xl font-bold mb-10 text-center'>LOGO</h3>
                <Input
                    type='text'
                    placeholder='Email'
                    className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                />
                <Input
                    type='password'
                    placeholder='Password'
                    className='border rounded-md px-3 py-2 mb-4 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                />
                <Button className=' px-4 py-2 rounded-md'>Login</Button>

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
            </div>

            <div className='border p-6 m-2 rounded-md shadow-xl w-full sm:w-[400px] text-center shadcn-bg-white'>
                <span className=''>
                    Don't have an account?{' '}
                    <Link href='/auth/register' className='text-blue-500'>
                        Signup
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default LoginPage;
