import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ChartSkeleton = () => {
    return (
        <div className='h-[450px] bg-secondary p-5 rounded-xl'>
            <Skeleton className='h-6 w-[180px] mb-5' />
            <div className='w-full h-full animate-pulse'></div>
        </div>
    );
};

export default ChartSkeleton;
