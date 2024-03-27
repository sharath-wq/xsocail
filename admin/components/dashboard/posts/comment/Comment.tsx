import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardDescription } from '@/components/ui/card';
import { Label } from '@radix-ui/react-dropdown-menu';

import React from 'react';
import TimeAgo from 'react-timeago';

const Comment = ({ author, content, createdAt, likeCount }: any) => {
    const timeDifference: number = Date.now() - new Date(createdAt).getTime();

    let timeAgo: string | React.ReactNode;
    if (timeDifference < 60000) {
        timeAgo = 'Just now';
    } else {
        timeAgo = <TimeAgo date={createdAt} />;
    }

    return (
        <div className='flex justify-between w-full mt-2'>
            <div className='flex gap-5'>
                <Avatar>
                    <AvatarImage src={author.imageUrl} alt='shadcn' />
                    <AvatarFallback>{author.username.split('')[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <Label className='flex items-baseline gap-1'>
                        <p>
                            <span className='font-bold text-base'>{author.username}</span> {content}
                        </p>
                    </Label>
                    <CardDescription>
                        {timeAgo} {`${likeCount} likes`}
                    </CardDescription>
                </div>
            </div>
        </div>
    );
};

export default Comment;
