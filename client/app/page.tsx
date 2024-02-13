'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';

const Home: React.FC = () => {
    const { currentUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push('/home');
        } else {
            router.push('/auth/login');
        }
    }, [currentUser, router]);

    return <div>Loading....</div>;
};

export default Home;
