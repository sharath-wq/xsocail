import React from 'react';
import CardSkeleton from './CardSkeleton';
import PopularPostsSkeleton from './PopularPostsSkeleton';
import ChartSkeleton from './ChartSkeleton';

const DashboardSkeleton = () => {
    return (
        <div className='flex gap-5 mt-5'>
            <div className='flex-[3] flex flex-col gap-5'>
                <div className='flex gap-5 justify-between'>
                    {[1, 2, 3, 4].map((_, index) => (
                        <CardSkeleton key={index} />
                    ))}
                </div>
                <PopularPostsSkeleton />
                <ChartSkeleton />
            </div>
        </div>
    );
};

export default DashboardSkeleton;
