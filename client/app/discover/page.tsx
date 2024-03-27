'use client';

import BlurImage from '@/components/discover/blurImage/BlurImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { debounce } from '@/lib/utils';
import { PostData } from '@/types/post';
import axios from 'axios';
import { useEffect, useState } from 'react';

const DiscoverPage = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [q, setQ] = useState<string>('');

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`/api/posts?q=${q}`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        const debouncedFetchPosts = debounce(fetchPosts, 300);

        if (q.trim() !== '') {
            debouncedFetchPosts();
        } else {
            fetchPosts();
        }

        return () => {
            debouncedFetchPosts.cancel();
        };
    }, [q]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleButtonClick = () => {
        fetchPosts();
    };

    console.log(posts);

    return (
        <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className='flex w-full max-w-sm space-x-2 mb-10'>
                <Input value={q} onChange={(e) => setQ(e.target.value)} type='email' placeholder='Search posts' />
                <Button onClick={handleButtonClick} type='submit'>
                    Search
                </Button>
            </div>
            <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                {posts ? posts.map((image) => <BlurImage key={image.id} {...image} />) : 'No Post found'}
            </div>
        </div>
    );
};

export default DiscoverPage;
