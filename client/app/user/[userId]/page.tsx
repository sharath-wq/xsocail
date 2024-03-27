'use client';

import ProfileHeader from '@/components/profile/ProfileHeader';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useRef, useState } from 'react';
import UserPosts from '@/components/profile/UserPosts';
import axios, { AxiosError } from 'axios';
import ProfileHeaderSkelton from '@/components/Skeltons/profile/ProfileHeaderSkelton';
import PostsGridSkeleton from '@/components/Skeltons/profile/PostsGridSkelton';
import { UserData } from '@/types/user';
import { UserPostData } from '@/types/post';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import { Socket, io } from 'socket.io-client';
import { useNotifications } from '@/context/notificationContext';

const ProfilePage = () => {
    const [userData, setUserData] = useState<UserData>();
    const [userPostsData, setuserPostsData] = useState<UserPostData[] | null>(null);
    const { userId }: { userId: string } = useParams();
    const socket = useRef<Socket>();

    const { setCount } = useNotifications();

    const { currentUser } = useUser();

    const router = useRouter();

    const fetchUserPosts = async () => {
        try {
            const { data } = await axios.get(`/api/posts/user/${userId}`);
            setuserPostsData(data);
        } catch (e) {
            const error = e as AxiosError;
        }
    };

    useEffect(() => {
        if (!currentUser) {
            router.push('/auth/login');
        }
    }, [currentUser, router]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/api/users/${userId}`);
                setUserData(data);
            } catch (e) {
                const error = e as AxiosError;
                console.log(error);
            }
        })();

        fetchUserPosts();
    }, [userId]);

    useEffect(() => {
        socket.current = io('wss://xsocial.dev/notification');

        return () => {
            socket.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        socket.current?.emit('addUser', currentUser && currentUser.userId);
    }, [currentUser, socket.current]);

    useEffect(() => {
        socket.current?.on('getNotification', (data) => {
            setCount(data.count);
        });
    }, [socket]);

    const handleNotification = (senderId: string, receiverId: string) => {
        socket.current?.emit('sendNotification', {
            senderId,
            receiverId,
        });
    };

    return (
        <div className='flex justify-center mt-20 h-screen '>
            <div className='w-3/4 flex flex-col gap-10'>
                {userData ? (
                    <ProfileHeader
                        handleNotification={handleNotification}
                        own={userId === currentUser?.userId}
                        {...userData}
                    />
                ) : (
                    <ProfileHeaderSkelton />
                )}
                <Separator className='mt-4 mb-2' />
                {userPostsData ? (
                    <div className='flex justify-center'>
                        <UserPosts
                            own={userId === currentUser?.userId}
                            fetchUserPosts={fetchUserPosts}
                            posts={userPostsData}
                        />
                    </div>
                ) : (
                    <PostsGridSkeleton />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
