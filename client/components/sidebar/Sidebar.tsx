'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { links } from '@/lib/constants/Links';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

const Sidebar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className={`flex h-screen fixed left-0 ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}>
            <div className=' w-64 hidden sm:flex justify-between flex-col'>
                <div className='flex flex-col gap-14'>
                    <div className='p-4 text-center'>
                        <h2 className='text-2xl font-bold'>LOGO</h2>
                    </div>

                    <nav>
                        <ul className='space-y-4 flex-grow'>
                            {links.map((link) => (
                                <li
                                    key={link.label}
                                    className='p-4 ml-4 font-bold cursor-pointer dark:text-white text-black flex gap-5 items-center rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md hover:bg-slate-200 dark:hover:bg-slate-600'
                                >
                                    {link.icon}
                                    <Link href={link.link}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className='p-4 '>
                    <Button variant={'ghost'} className='p-2 rounded-md flex gap-4'>
                        <LogOut />
                        Logout
                    </Button>
                </div>
            </div>

            <button className='sm:hidden fixed right-0 top-0 p-4 z-50' onClick={toggleMobileMenu}>
                <span className='dark:text-white text-black text-2xl'>☰</span>
            </button>

            {isMobileMenuOpen && (
                <div className='sm:hidden fixed inset-0 bg-black bg-opacity-25 z-40'>
                    <div className='text-white h-screen w-64 p-4 flex flex-col justify-between'>
                        <div className='text-center'>
                            <h2 className='text-2xl font-bold dark:text-white text-black'>LOGO</h2>
                        </div>

                        <nav>
                            <ul className='space-y-4 flex-grow'>
                                {links.map((link) => (
                                    <li
                                        key={link.label}
                                        className='p-4 cursor-pointer dark:text-white text-black hover:bg-slate-200 dark:hover:bg-slate-600 flex gap-5 items-center'
                                    >
                                        {link.icon}
                                        <Link href={link.link}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className='p-4 '>
                            <Button variant={'ghost'} className='dark:text-white text-black p-2 rounded-md'>
                                <LogOut />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
