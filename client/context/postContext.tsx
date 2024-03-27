import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface Author {
    userId: string;
    username: string;
    imageUrl: string;
}

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

interface PostContextType {
    posts: Post[];
    post: Post | undefined;
    getPosts: () => Promise<void>;
    getPostById: (id: string) => Promise<void>;
}

const PostContext = createContext<PostContextType>({
    posts: [],
    post: undefined,
    getPosts: async () => {},
    getPostById: async (id: string) => {},
});

export const usePost = (): PostContextType => {
    return useContext(PostContext);
};

export const PostProvider: React.FC = ({ children }: any) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [post, setPost] = useState<Post>();

    const getPosts = async () => {
        try {
            const { data } = await axios.get('/api/posts/feed');
            setPosts(data);
        } catch (e) {
            const error = e as AxiosError;
            console.error('Error fetching posts:', error.message);
            setPosts([]);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                await getPosts();
            } catch (e) {
                const error = e as AxiosError;
                console.error('Error fetching posts on mount:', error.message);
                setPosts([]);
            }
        })();
    }, []);

    const getPostById = async (id: string) => {
        try {
            const { data } = await axios.get(`/api/posts/single/${id}`);
            setPost(data);
        } catch (e) {
            const error = e as AxiosError;
            console.error('Error fetching posts:', error.message);
            setPost(undefined);
        }
    };

    const postContextValue: PostContextType = {
        posts,
        post,
        getPosts,
        getPostById,
    };

    return <PostContext.Provider value={postContextValue}>{children}</PostContext.Provider>;
};
