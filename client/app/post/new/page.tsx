import PostForm from '@/components/postForm/PostForm';
import { SquarePen } from 'lucide-react';
import React from 'react';

const CreatePost = () => {
    return (
        <div className='flex'>
            <div className='container gap-5'>
                <div className='flex gap-4 items-center my-10'>
                    <SquarePen />
                    <h2 className='text-3xl font-bold'>Create Post</h2>
                </div>

                <PostForm />
            </div>
        </div>
    );
};

export default CreatePost;
