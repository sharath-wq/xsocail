import EditProfile from '@/components/profile/EditProfile';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Settings } from 'lucide-react';
import React from 'react';

const ProfileHeaderSkelton = () => {
    return (
        <div className='flex p-4 shadow-md'>
            <div className='flex items-center'>
                <Skeleton className='h-52 w-52 rounded-full' />
            </div>

            <div className='flex flex-col  ml-20 gap-5 mt-6'>
                <div className='flex flex-col md:flex-row gap-5 items-center'>
                    <Skeleton className='h-10 w-[250px]' />
                </div>

                <div className='flex flex-wrap md:flex-nowrap gap-4'>
                    <div className='text-center mb-2 md:mb-0'>
                        <span className='block font-bold text-lg'>
                            <Skeleton className='h-6 w-20' />
                        </span>
                    </div>
                    <div className='text-center mb-2 md:mb-0'>
                        <span className='block font-bold text-lg'>
                            <Skeleton className='h-6 w-20' />
                        </span>
                    </div>
                    <div className='text-center'>
                        <span className='block font-bold text-lg'>
                            <Skeleton className='h-6 w-20' />
                        </span>
                    </div>
                </div>

                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[400px]' />
                    <Skeleton className='h-4 w-[400px]' />
                </div>
            </div>
        </div>
    );
};
``;

export default ProfileHeaderSkelton;
