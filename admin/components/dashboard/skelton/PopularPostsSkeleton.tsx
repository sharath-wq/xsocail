import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const PopularPostsSkeleton = () => {
    return (
        <div className='bg-secondary p-5 rounded-xl'>
            <Skeleton className='h-6 w-[180px] mb-5' />
            <table className='w-full'>
                <thead>
                    <tr>
                        <td className='p-3'>
                            <Skeleton className='h-6 w-[100px]' />
                        </td>
                        <td className='p-3'>
                            <Skeleton className='h-6 w-[100px]' />
                        </td>
                        <td className='p-3'>
                            <Skeleton className='h-6 w-[100px]' />
                        </td>
                        <td className='p-3'>
                            <Skeleton className='h-6 w-[100px]' />
                        </td>
                        <td className='p-3'>
                            <Skeleton className='h-6 w-[100px]' />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3].map((_, index) => (
                        <tr key={index}>
                            <td className='p-3'>
                                <Skeleton className='h-12 w-12 rounded-md' />
                            </td>
                            <td className='p-3'>
                                <Skeleton className='h-12 w-12 rounded-full' />
                            </td>
                            <td className='p-3'>
                                <Skeleton className='h-6 w-[100px]' />
                            </td>
                            <td className='p-3'>
                                <Skeleton className='h-6 w-[100px]' />
                            </td>
                            <td className='p-3'>
                                <Skeleton className='h-6 w-[100px]' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PopularPostsSkeleton;
