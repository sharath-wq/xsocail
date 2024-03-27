'use client';

import ProfileHeader from '@/components/profile/ProfileHeader';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useUser } from '@/context/userContext';
import ProfileHeaderSkelton from '@/components/Skeltons/profile/ProfileHeaderSkelton';
import PostsGridSkeleton from '@/components/Skeltons/profile/PostsGridSkelton';
import { UserData } from '@/types/user';
import { PostData, UserPostData } from '@/types/post';
import { useRouter } from 'next/navigation';
import ProfileTabs from '@/components/profile/tabs/ProfileTabs';

const ProfilePage = () => {
    const [userData, setUserData] = useState<UserData>();
    const [userPostsData, setuserPostsData] = useState<UserPostData[] | null>(null);
    const [savedPosts, setSavedPosts] = useState<PostData[]>();

    const router = useRouter();
    const { currentUser } = useUser();

    const fetchUserPosts = async () => {
        try {
            const { data } = await axios.get(`/api/posts/user/${currentUser!.userId}/`);
            setuserPostsData(data);
        } catch (e) {
            const error = e as AxiosError;
        }
    };

    const fetchUserSavedPosts = async () => {
        try {
            const { data } = await axios.get(`/api/users/saved`);
            setSavedPosts(data);
        } catch (e) {
            const error = e as AxiosError;
        }
    };

    useEffect(() => {
        if (!currentUser) {
            router.push('/auth/login');
        } else {
            router.push('/profile');
        }
    }, [currentUser, router]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/api/users/${currentUser!.userId}`);
                setUserData(data);
            } catch (e) {
                const error = e as AxiosError;
            }
        })();

        fetchUserPosts();
        fetchUserSavedPosts();
    }, [currentUser]);

    return (
        <div className='flex justify-center mt-20 h-screen '>
            <div className='w-3/4 flex flex-col gap-10'>
                {userData ? <ProfileHeader own={true} {...userData} /> : <ProfileHeaderSkelton />}
                <Separator className='mt-4 mb-2' />
                {userPostsData ? (
                    <ProfileTabs
                        fetchSavedPosts={fetchUserPosts}
                        savedPosts={savedPosts || []}
                        fetchUserPosts={fetchUserPosts}
                        userPostsData={userPostsData}
                    />
                ) : (
                    <PostsGridSkeleton />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
