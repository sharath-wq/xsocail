import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SingleSuggesteduser = ({
    id,
    imageUrl,
    username,
    fullName,
    handleNotification,
}: {
    id: string;
    imageUrl: string;
    username: string;
    fullName: string;
    handleNotification: (senderId: string, receiverId: string) => void;
}) => {
    const { currentUser } = useUser();
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        setIsFollowing((currentUser && currentUser.following?.includes(id)) || false);
    }, [currentUser, id]);

    const handleClick = async () => {
        try {
            await axios.put(`/api/users/${isFollowing ? 'unfollow' : 'follow'}/${id}`);
            toast({
                description: `${isFollowing ? 'unfollowed' : 'followed'}`,
            });

            if (!isFollowing) {
                handleNotification(currentUser!.userId, id);
            }
            setIsFollowing((prev) => !prev);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div key={id} className='flex gap-4'>
            <Avatar>
                <AvatarImage src={imageUrl} alt={username} />
                <AvatarFallback>{username.split('')[0]}</AvatarFallback>
            </Avatar>
            <Link href={`/user/${id}`}>
                <div className='flex flex-col'>
                    <span className='text-base'>{username}</span>
                    <span className='text-xs'>{fullName}</span>
                </div>
            </Link>
            <Button onClick={handleClick} className='ml-auto' variant={'outline'}>
                {isFollowing ? 'unfollow' : 'follow'}
            </Button>
        </div>
    );
};

export default SingleSuggesteduser;
