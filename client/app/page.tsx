'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import { Loader } from 'lucide-react';

const Home: React.FC = () => {
    const { currentUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/auth/login');
        } else {
            router.push('/home');
        }
    }, [currentUser, router]);

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Loader className='animate-spin' />
        </div>
    );
};

export default Home;
