'use client';

import Post from '@/components/post/Post';
import { Suggetions } from '@/components/user-suggetions/Suggetions';
import React from 'react';

import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { PostProps } from '@/types/post';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { usePost } from '@/context/postContext';

const Home = async () => {
    const { currentUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/auth/login');
        } else {
            router.push('/home');
        }
    }, [currentUser, router]);

    const { posts } = usePost();

    return (
        <div className='w-full flex flex-col gap-10 sm:flex-row'>
            <div className='w-full sm:w-1/2 flex flex-col gap-10'>
                {posts && posts.map((post: PostProps) => <Post {...post} />)}
            </div>

            <div className='hidden sm:block p-4'>
                <Suggetions />
            </div>
        </div>
    );
};

export default Home;
