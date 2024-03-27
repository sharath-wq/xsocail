'use client';

import { useUser } from '@/context/user.context';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();
    const { currentUser } = useUser();

    useEffect(() => {
        if (currentUser && currentUser.isAdmin) {
            router.replace('/dashboard');
        } else {
            router.replace('/login');
        }
    }, [router, currentUser]);

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Loader className='animate-spin' />
        </div>
    );
}
