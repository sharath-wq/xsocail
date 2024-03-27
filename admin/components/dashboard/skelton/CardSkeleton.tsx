import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const CardSkeleton = () => {
    return (
        <div className='p-5 rounded-xl bg-secondary animate-pulse'>
            <Skeleton className='h-12 w-12 rounded-full mb-2' />
            <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px]' />
                <Skeleton className='h-4 w-[200px]' />
            </div>
        </div>
    );
};

export default CardSkeleton;
