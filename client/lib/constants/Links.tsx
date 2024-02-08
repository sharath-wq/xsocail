import {
    AiOutlineHome,
    AiOutlineSearch,
    AiOutlineGlobal,
    AiOutlineMessage,
    AiOutlineAlert,
    AiOutlinePlus,
    AiOutlineUser,
} from 'react-icons/ai';

export const links = [
    {
        label: 'Home',
        link: '/',
        icon: <AiOutlineHome />,
    },
    {
        label: 'Search',
        link: '/search',
        icon: <AiOutlineSearch />,
    },

    {
        label: 'Discover',
        link: '/discover',
        icon: <AiOutlineGlobal />,
    },
    {
        label: 'Chat',
        link: '/chat',
        icon: <AiOutlineMessage />,
    },
    {
        label: 'Notifications',
        link: '/notifications',
        icon: <AiOutlineAlert />,
    },
    {
        label: 'Create',
        link: '/create',
        icon: <AiOutlinePlus />,
    },
    {
        label: 'Account',
        link: '/account',
        icon: <AiOutlineUser />,
    },
];
