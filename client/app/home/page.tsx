'use client';

import { Suggetions } from '@/components/user-suggetions/Suggetions';
import React, { useRef } from 'react';
import { Socket, io } from 'socket.io-client';

import { useEffect } from 'react';
import { IPost, PostProps } from '@/types/post';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { usePost } from '@/context/postContext';
import { useNotifications } from '@/context/notificationContext';
import Post from '@/components/post/Post';
import { AxiosError } from 'axios';

const Home = () => {
    const { currentUser } = useUser();
    const router = useRouter();
    const socket = useRef<Socket>();

    const { count, setCount } = useNotifications();

    useEffect(() => {
        const sessionCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('session='));

        if (!currentUser && !sessionCookie) {
            router.push('/auth/login');
        } else if (currentUser && currentUser.isBlocked) {
            router.replace('/auth/blocked');
        }
    }, [currentUser, router]);

    useEffect(() => {
        socket.current = io('wss://xsocial.dev');
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
            count: count + 1,
        });
    };

    const { getNotifications } = useNotifications();

    useEffect(() => {
        (async () => {
            try {
                if (currentUser?.userId) {
                    await getNotifications();
                }
            } catch (e) {
                const error = e as AxiosError;
            }
        })();
    }, [currentUser]);

    const { posts } = usePost();

    return (
        <div className='w-full flex flex-col gap-10 sm:flex-row'>
            <div className='w-full sm:w-1/2 flex flex-col gap-10'>
                {posts &&
                    posts.map((post: IPost) => <Post key={post.id} {...post} handleNotification={handleNotification} />)}
            </div>

            <div className='hidden sm:block p-4'>
                <Suggetions />
            </div>
        </div>
    );
};

export default Home;
