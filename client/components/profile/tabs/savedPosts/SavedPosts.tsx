import { useUser } from '@/context/userContext';
import { PostData } from '@/types/post';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import SingleSavedPosts from './singleSavedPosts/SingleSavedPosts';

const SavedPosts = ({ savedPosts, fetchUserSavedPosts }: { savedPosts: PostData[]; fetchUserSavedPosts: () => void }) => {
    return (
        <div className='container mx-auto mt-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {savedPosts && savedPosts.length ? (
                    savedPosts.map((post) => (
                        <SingleSavedPosts
                            id={post.id}
                            fetchUserSavedPosts={fetchUserSavedPosts}
                            key={post.id}
                            imageUrl={post.imageUrls[0]}
                        />
                    ))
                ) : (
                    <p>No Posts</p>
                )}
            </div>
        </div>
    );
};

export default SavedPosts;
