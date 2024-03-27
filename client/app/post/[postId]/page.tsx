'use client';

import EditPostForm from '@/components/editPostForm/EditPostForm';
import { SquarePen } from 'lucide-react';
import React from 'react';

const EditPost = () => {
    return (
        <div className='flex'>
            <div className='container gap-5'>
                <div className='flex gap-4 items-center my-10'>
                    <SquarePen />
                    <h2 className='text-3xl font-bold'>Edit Post</h2>
                </div>

                <EditPostForm />
            </div>
        </div>
    );
};

export default EditPost;
