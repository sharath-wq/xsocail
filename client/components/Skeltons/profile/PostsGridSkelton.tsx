import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const PostsGridSkeleton = () => {
    const numberOfSkeletons = 6;

    const renderSkeletons = () => {
        const skeletons = [];

        for (let i = 0; i < numberOfSkeletons; i++) {
            skeletons.push(
                <div key={i} className='col-span-1 md:col-span-2 lg:col-span-1'>
                    <Skeleton className='h-64 w-full' />
                </div>
            );
        }

        return skeletons;
    };

    return (
        <div className='container mx-auto mt-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>{renderSkeletons()}</div>
        </div>
    );
};

export default PostsGridSkeleton;
