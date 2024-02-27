'use client';

import Sidebar from '@/components/sidebar/Sidebar';
import { ModeToggle } from '@/components/ui/modeToggle';
import { PostProvider } from '@/context/postContext';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='relative'>
            <div className='fixed top-5 right-5 sm:block hidden'>
                <ModeToggle />
            </div>
            <div className='float-left w-64 sm:w-80'>
                <Sidebar />
            </div>
            <div className='ml-4 p-4 sm:ml-80'>
                {/* @ts-ignore */}
                <PostProvider>{children}</PostProvider>
            </div>
        </div>
    );
}
