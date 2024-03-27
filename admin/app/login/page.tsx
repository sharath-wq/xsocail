'use client';

import LoginForm from '@/components/login/loginForm/LoginForm';
import { useUser } from '@/context/user.context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => {
    const { currentUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (currentUser && currentUser.isAdmin) {
            router.replace('/dashboard');
        }
    }, [currentUser, router]);

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
