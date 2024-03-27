'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, UserData } from '@/types/user';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatOnline = ({
    onlineUsers,
    currentId,
    setCurrentChat,
}: {
    onlineUsers: UserData[];
    currentId: string;
    setCurrentChat: any;
}) => {
    const [friends, setFriends] = useState<UserData[]>([]);
    const [onlineFriends, setOnlineFriends] = useState<UserData[]>([]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const { data } = await axios.get(`/api/users/friends/${currentId}`);
                setFriends(data);
            } catch (error) {
                console.log(error);
            }
        };

        getFriends();
    }, [currentId]);

    useEffect(() => {
        friends && setOnlineFriends(friends.filter((f: any) => onlineUsers.includes(f.id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user: UserData) => {
        try {
            const { data } = await axios.get(`/api/chat/conversation/${currentId}/${user.id}`);
            setCurrentChat(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='chatOnline'>
            {onlineFriends.map((o) => (
                <div
                    className='flex items-center font-medium cursor-pointer mt-3'
                    onClick={() => handleClick(o)}
                    key={o.id}
                >
                    <div className='relative mr-3'>
                        <Avatar>
                            <AvatarImage src={o.imageUrl} alt='@shadcn' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='w-4 h-4 rounded-full bg-[#ADFA1D] absolute top-[-2px] right-[-2px] border-2 border-white'></div>
                    </div>

                    <div className='flex flex-col'>
                        <span className='font-bold ml-5'>{o.username}</span>
                        <span className='font-light ml-5'>{o.fullName}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatOnline;
