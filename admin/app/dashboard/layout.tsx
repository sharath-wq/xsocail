'use client';

// Import necessary components and modules
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/user.context';
import Navbar from '@/components/dashboard/navbar/Navbar';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import React, { useEffect } from 'react';
import { Loader } from 'lucide-react';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { currentUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/login');
        } else {
            if (!currentUser.isAdmin) {
                router.push('/forbidden');
            }
        }
    }, [router, currentUser]);

    return currentUser ? (
        <div className='flex flex-[1]'>
            <div className='flex-[1] p-5 min-h-screen'>
                <Sidebar />
            </div>
            <div className='flex-[4] p-5'>
                <Navbar />
                {children}
            </div>
        </div>
    ) : (
        <div className='w-full h-screen flex justify-center items-center'>
            <Loader className='animate-spin' />
        </div>
    );
};

export default Layout;
