'use client';

import Post from '@/components/post/Post';
import { useNotifications } from '@/context/notificationContext';
import { useUser } from '@/context/userContext';
import { Author } from '@/types/comment';
import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

interface Post {
    id: string;
    author: Author;
    caption: string;
    tags: string[];
    imageUrls: string[];
    likes: string[];
    comments: string[];
    createdAt: Date;
    isEdited: boolean;
}

const SinglePost = () => {
    const { currentUser } = useUser();
    const router = useRouter();
    const socket = useRef<Socket>();
    const { getNotifications } = useNotifications();
    const { postId }: { postId: string } = useParams();
    const [post, setPost] = useState<Post>();

    const { count, setCount } = useNotifications();

    const getPostById = async (id: string) => {
        try {
            const { data } = await axios.get(`/api/posts/${id}`);
            setPost(data);
        } catch (e) {
            const error = e as AxiosError;
            console.error('Error fetching posts:', error.message);
            setPost(undefined);
        }
    };

    useEffect(() => {
        getPostById(postId);
    }, []);

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

    useEffect(() => {
        (async () => {
            try {
                if (currentUser?.userId) {
                    await getNotifications();
                    await getPostById(postId);
                }
            } catch (e) {
                const error = e as AxiosError;
            }
        })();
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) {
            router.replace('/auth/login');
        }
    }, [currentUser, router]);

    return (
        <div className='w-full flex flex-col gap-10 sm:flex-row'>
            <div className='w-full sm:w-1/2 flex flex-col gap-10'>
                {currentUser ? (
                    post && <Post key={postId} {...post} handleNotification={handleNotification} />
                ) : (
                    <div className='w-full h-screen flex justify-center items-center'>
                        <Loader className='animate-spin' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SinglePost;
