import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { IMessage } from '@/types/message';
import TimeAgo from 'react-timeago';

const Message = ({ message, own }: { message: IMessage; own: boolean }) => {
    const timeDifference: number = Date.now() - new Date(message.createdAt).getTime();

    let timeAgo: string | React.ReactNode;
    if (timeDifference < 60000) {
        timeAgo = 'Just now';
    } else {
        timeAgo = <TimeAgo date={message.createdAt} />;
    }
    return (
        <div className={`flex flex-col mt-20 ${own ? 'items-end' : ''}`}>
            <div className={`flex gap-2 w-full ${own ? 'flex-row' : 'flex-row-reverse'} `}>
                <div className={`flex flex-col ${own ? 'items-start' : 'items-end'}`}>
                    {message.imageUrl && (
                        <img
                            className='rounded-xl'
                            src={message.imageUrl}
                            alt={`image`}
                            style={{ objectFit: 'cover', width: '60%' }}
                        />
                    )}
                    {message.text && (
                        <p
                            className={`p-3 max-w-xs ${
                                own
                                    ? 'rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-secondary'
                                    : 'rounded-tr-2xl rounded-bl-2xl rounded-tl-2xl bg-transparent border'
                            }`}
                        >
                            {message?.text}
                        </p>
                    )}
                    <div className='text-sm mt-2'>{timeAgo}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
