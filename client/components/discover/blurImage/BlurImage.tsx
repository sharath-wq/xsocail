'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { PostData } from '@/types/post';
import { AvatarFallback } from '@radix-ui/react-avatar';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const BlurImage = ({ id, imageUrls, author }: PostData) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <Link href={`/post/view/${id}`} className='group'>
            <div className='relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8'>
                <Image
                    alt=''
                    src={imageUrls[0]}
                    width={300}
                    height={300}
                    objectFit='cover'
                    className={cn(
                        'duration-700 ease-in-out group-hover:opacity-75',
                        isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
                    )}
                    onLoad={() => setLoading(false)}
                />
                <Link href={`/user/${author.userId}`} className='absolute top-3 left-3'>
                    <Avatar>
                        <AvatarImage src={author.imageUrl} alt={author.username} />
                        <AvatarFallback>{author.username.split('')[0]}</AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </Link>
    );
};

export default BlurImage;
