'use client';

import { Bell, Globe2, MessageCircle, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className='p-5 rounded-xl bg-secondary flex items-center justify-between'>
            <div className='bg-secondary font-bold capitalize'>{pathname.split('/').pop()}</div>
            <div className='flex items-center gap-5'>
                <div className='flex items-center gap-3 p-3 rounded-xl'>
                    <Search />
                    <input type='text' placeholder='Search...' className='bg-transparent border-none outline-none' />
                </div>
                <div className='flex gap-5'>
                    <MessageCircle />
                    <Bell />
                    <Globe2 />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
