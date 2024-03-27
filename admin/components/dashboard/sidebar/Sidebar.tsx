'use client';

import { ImageOff, Images, LayoutDashboard, LogOut, UserX, Users } from 'lucide-react';
import Admin from '../navbar/admin/Admin';
import MenuLink from '../navbar/menuLink/MenuLink';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/dark-mode-button';
import { useUser } from '@/context/user.context';
import useRequest from '@/hooks/useRequest';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const menuItems = [
    {
        title: 'Pages',
        list: [
            {
                title: 'Dashboard',
                path: '/dashboard',
                icon: <LayoutDashboard />,
            },
            {
                title: 'Users',
                path: '/dashboard/users',
                icon: <Users />,
            },
            {
                title: 'Posts',
                path: '/dashboard/posts',
                icon: <Images />,
            },
        ],
    },
    {
        title: 'Analytics',
        list: [
            {
                title: 'Post Reports',
                path: '/dashboard/post-reports',
                icon: <ImageOff />,
            },
            {
                title: 'User Reports',
                path: '/dashboard/user-reports',
                icon: <UserX />,
            },
        ],
    },
    {
        title: 'User',
        list: [
            // {
            //     title: 'Settings',
            //     path: '/dashboard/settings',
            //     icon: <Settings />,
            // },
        ],
    },
];

const Sidebar = () => {
    const router = useRouter();
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
            router.push('/login');
        },
    });

    const handleLogout = () => {
        doRequest();
    };
    return (
        <div className='sticky top-10'>
            <div className='flex items-center gap-5 mb-5'>
                <Admin />
                <div className='flex flex-col'>
                    <span className='font-medium'>sharath-wq</span>
                    <span className='text-xs'>Administrator</span>
                </div>
                <div className='ml-auto'>
                    <ModeToggle />
                </div>
            </div>
            <ul>
                {menuItems.map((cat) => (
                    <li key={cat.title} className='py-2'>
                        <span className='font-bold text-sm mx-0 my-10'>{cat.title}</span>
                        {cat.list.map((item) => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>

            <Button onClick={handleLogout} variant={'ghost'} className=''>
                <LogOut className='mr-2' />
                Logout
            </Button>
        </div>
    );
};

export default Sidebar;
