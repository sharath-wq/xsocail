'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MenuLink = ({ item }: { item: any }) => {
    const pathname = usePathname();

    return (
        <Link
            href={item.path}
            className={`p-5 flex items-center gap-3 mx-0 my-1 rounded-xl hover:bg-secondary ${
                pathname === item.path && 'bg-secondary'
            }`}
        >
            {item.icon}
            <span className='font-medium'>{item.title}</span>
        </Link>
    );
};

export default MenuLink;
