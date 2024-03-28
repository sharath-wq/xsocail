'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Actions } from '@/components/dashboard/users/[id]/actions/Actions';
import { UserData } from '@/types/user';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation';

const Page = () => {
    const { id } = useParams();

    const [isBlocked, setIsBlocked] = useState(false);

    const handleSwitchChange = () => {
        setIsBlocked((prevIsBlocked) => !prevIsBlocked);
    };

    const [user, setUser] = React.useState<UserData>();

    const getUsers = async () => {
        try {
            const { data } = await axios.get(`/api/users/${id}`);
            setUser(data);
            setIsBlocked(data.isBlocked);
        } catch (e) {
            const error = e as AxiosError;
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        user && (
            <div className='p-5 rounded-xl mt-5 flex justify-center'>
                <Card className='w-2/3 '>
                    <CardHeader>
                        <div className='flex gap-3'>
                            <Avatar>
                                <AvatarImage src={user.imageUrl} alt='@shadcn' />
                                <AvatarFallback>{user.username.split('')[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{user.fullName}</CardTitle>
                                <CardDescription>@{user.username}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-wrap md:flex-nowrap gap-4'>
                            <div className='text-center mb-2 md:mb-0'>
                                <span className='block font-bold text-lg'>{user.posts.length}</span>
                                <span className=''>Posts</span>
                            </div>
                            <div className='text-center mb-2 md:mb-0'>
                                <span className='block font-bold text-lg'>{user.followers.length}</span>
                                <span className=''>Followers</span>
                            </div>
                            <div className='text-center'>
                                <span className='block font-bold text-lg'>{user.following.length}</span>
                                <span className=''>Following</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                        <Actions isBlocked={isBlocked} userId={user.id} />
                    </CardFooter>
                </Card>
            </div>
        )
    );
};

export default Page;
