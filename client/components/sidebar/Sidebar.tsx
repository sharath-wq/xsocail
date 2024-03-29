'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { links } from '@/lib/constants/Links';
import Link from 'next/link';
import { ChevronRight, LogOut } from 'lucide-react';
import useRequest from '@/hooks/useRequest';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useUser } from '@/context/userContext';
import { useNotifications } from '@/context/notificationContext';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Sidebar = () => {
    const router = useRouter();
    const { count } = useNotifications();

    const { getCurrentUser } = useUser();

    const { doRequest } = useRequest({
        url: '/api/users/logout',
        method: 'post',
        body: {},
        onSuccess: () => {
            toast({
                description: 'Logout successful',
            });
            getCurrentUser();
            router.push('/auth/login');
        },
    });

    const handleLogout = () => {
        doRequest();
    };

    const { currentUser } = useUser();

    return (
        <div className={`flex h-screen fixed left-0`}>
            <div className=' w-64 hidden sm:flex justify-between flex-col'>
                <div className='flex flex-col gap-14'>
                    <div className='pt-10 text-center flex items-center justify-center'>
                        <Avatar className='flex gap-5 items-center'>
                            <AvatarImage
                                className='rounded-full'
                                width={46}
                                height={46}
                                src={currentUser?.imageUrl}
                                alt='@shadcn'
                            />
                            <AvatarFallback>X</AvatarFallback>
                            <span className='font-bold'>@{currentUser?.username}</span>
                        </Avatar>
                    </div>

                    <nav className='ml-5'>
                        <ul className='space-y-4 flex-grow'>
                            {links.map((link) => (
                                <Link href={link.link}>
                                    <li
                                        key={link.label}
                                        className='p-4 ml-4 font-bold cursor-pointer dark:text-white text-black flex gap-5 items-center rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md hover:bg-slate-200 dark:hover:bg-slate-600'
                                    >
                                        {link.icon}
                                        {link.label}
                                        {link.link === '/notifications' && count > 0 && (
                                            <div className='w-[10px] h-[10px] bg-red-600 rounded-full p-[10px] tex-xm flex items-center justify-center'>
                                                {count}
                                            </div>
                                        )}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className='p-4 '>
                    <Button onClick={handleLogout} variant={'ghost'} className='p-2 rounded-md flex gap-4'>
                        <LogOut />
                        Logout
                    </Button>
                </div>
            </div>

            <div className='sm:hidden relative block justify-center items-center'>
                <Sheet>
                    <SheetTrigger>
                        <span className='text-2xl absolute'>
                            <ChevronRight />
                        </span>
                    </SheetTrigger>
                    <SheetContent side={'left'}>
                        <div className='sm:hidden fixed inset-0  bg-opacity-25 z-40'>
                            <div className=' h-screen w-64 p-4 flex flex-col justify-between'>
                                <div className='text-center'>
                                    <h2 className='text-2xl font-bold '>LOGO</h2>
                                </div>

                                <nav>
                                    <ul className='space-y-4 flex-grow'>
                                        {links.map((link) => (
                                            <li key={link.label} className='p-4 cursor-pointer flex gap-5 items-center'>
                                                {link.icon}
                                                <Link href={link.link}>{link.label}</Link>
                                                {link.link === '/notifications' && count > 0 && (
                                                    <div className='w-[10px] h-[10px] bg-red-600 rounded-full p-[10px] tex-xm flex items-center justify-center'>
                                                        {count}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>

                                <div className='p-4 '>
                                    <Button onClick={handleLogout} variant={'ghost'} className=' p-2 rounded-md'>
                                        <LogOut />
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default Sidebar;
