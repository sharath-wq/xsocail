import Post from '@/components/post/Post';
import { Suggetions } from '@/components/user-suggetions/Suggetions';
import React from 'react';

const Home = () => {
    return (
        <div className='w-full flex flex-col gap-10 sm:flex-row'>
            <div className='w-full sm:w-1/2 flex flex-col gap-10'>
                <Post />
                <Post />
            </div>

            <div className='hidden sm:block p-4'>
                <Suggetions />
            </div>
        </div>
    );
};

export default Home;
