import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Register: React.FC = () => {
    return (
        <div className='flex flex-col items-center'>
            <div className='border border-grayBorder p-8 m-2 rounded-md shadow-md flex flex-col w-full sm:w-[400px] shadcn-bg-white shadcn-rounded-md'>
                <h3 className='text-2xl font-bold mb-10 text-center'>LOGO</h3>
                <Input
                    type='text'
                    placeholder='Email'
                    className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                />
                <Input
                    type='text'
                    placeholder='Full Name'
                    className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                />
                <Input
                    type='text'
                    placeholder='Username'
                    className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                />
                <Input
                    type='password'
                    placeholder='Password'
                    className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                />
                <Input
                    type='password'
                    placeholder='Confirm Password'
                    className='border rounded-md px-3 py-2 mb-4 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                />
                <Button className='shadcn-bg-bluePrimary shadcn-hover:bg-blueSecondary px-4 py-2 rounded-md'>Signup</Button>

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
