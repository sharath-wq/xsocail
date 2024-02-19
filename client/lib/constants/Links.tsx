import { Bell, CircleUser, Globe, Home, MessageCircle, PlusCircle, Search } from 'lucide-react';

export const links = [
    {
        label: 'Home',
        link: '/',
        icon: <Home />,
    },
    {
        label: 'Search',
        link: '/search',
        icon: <Search />,
    },

    {
        label: 'Discover',
        link: '/discover',
        icon: <Globe />,
    },
    {
        label: 'Chat',
        link: '/chat',
        icon: <MessageCircle />,
    },
    {
        label: 'Notifications',
        link: '/notifications',
        icon: <Bell />,
    },
    {
        label: 'Create',
        link: '/post/new',
        icon: <PlusCircle />,
    },
    {
        label: 'Account',
        link: '/profile',
        icon: <CircleUser />,
    },
];
