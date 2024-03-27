import Link from 'next/link';
import React from 'react';

const Card = ({
    label,
    count,
    icon,
    link,
}: {
    label: string;
    count: number;
    index: number;
    icon: JSX.Element;
    link: string;
}) => {
    const change = 0;

    return (
        <Link
            href={link}
            className='p-5 rounded-xl flex items-center gap-5 cursor-pointer w-full bg-secondary shadow-md hover:shadow-lg'
        >
            {icon}
            <div className='flex flex-col'>
                <span className='text-lg font-semibold text-primary'>{label}</span>
                <span className='text-xl font-bold'>{count}</span>
            </div>
        </Link>
    );
};

export default Card;
