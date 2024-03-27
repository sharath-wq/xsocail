import { ImageOff, Images, UserX, Users } from 'lucide-react';

interface Card {
    icon: JSX.Element;
    link: string;
}

export const CARDS: Card[] = [
    { icon: <Users className='h-12 w-12 text-primary' />, link: '/dashboard/users' },
    { icon: <Images className='h-12 w-12 text-primary' />, link: '/dashboard/posts' },
    { icon: <UserX className='h-12 w-12 text-primary' />, link: '/dashboard/user-reports' },
    { icon: <ImageOff className='h-12 w-12 text-primary' />, link: '/dashboard/post-reports' },
];
