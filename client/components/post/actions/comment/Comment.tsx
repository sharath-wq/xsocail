'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AddCommentForm from './addCommentForm/AddCommentForm';
import { PostProps } from '@/types/post';
import axios, { AxiosError } from 'axios';
import { Author, CommentResponse } from '@/types/comment';
import SingleComment from './singleComment/SingleComment';
import TimeAgo from 'react-timeago';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useUser } from '@/context/userContext';
import Save from '../save/Save';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const Comment = ({
    postId,
    setCommentCount,
    isLiked,
    handleLikeButtonClick,
    likeCount,
    author,
    isSaved,
    setIsSaved,
    handleNotification,
    imageUrls,
    caption,
    tags,
}: {
    postId: string;
    setCommentCount: Dispatch<SetStateAction<number>>;
    isLiked: boolean;
    handleLikeButtonClick: () => void;
    likeCount: number;
    author: Author;
    isSaved: boolean;
    setIsSaved: Dispatch<SetStateAction<boolean>>;
    handleNotification: (senderId: string, receiverId: string) => void;
    imageUrls: string[];
    caption: string;
    tags: string[];
}) => {
    const [post, setPost] = useState<PostProps>();
    const [comments, setComments] = useState<CommentResponse[]>();
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState('');

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const { currentUser } = useUser();

    const getPosts = async () => {
        try {
            const { data } = await axios.get(`/api/posts/${postId}`);
            setPost(data);
        } catch (e) {
            const error = e as AxiosError;
        }
    };

    const getComments = async () => {
        try {
            const { data } = await axios.get(`/api/comments/${postId}`);
            setComments(data);
            setCommentCount(data.length);
        } catch (e) {
            const error = e as AxiosError;
            setError('Error Fetching Comments.');
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const handleModelOpen = async (open: boolean) => {
        if (open) {
            await getComments();
        }
    };

    const timeDifference: number = Date.now() - new Date(post?.createdAt || '').getTime();

    let timeAgo: string | React.ReactNode;
    if (timeDifference < 60000) {
        timeAgo = 'Just now';
    } else {
        timeAgo = <TimeAgo date={post?.createdAt || new Date()} />;
    }

    return (
        <Dialog onOpenChange={handleModelOpen}>
            <DialogTrigger asChild>
                <Button variant={'ghost'}>
                    <MessageCircle />
                </Button>
            </DialogTrigger>
            <DialogContent className='h-[90%] w-full max-w-screen-xl flex'>
                <div className='w-1/2 flex flex-col'>
                    <Carousel className='w-full flex-grow'>
                        <CarouselContent>
                            {Array.from({ length: imageUrls?.length }).map((_, index) => (
                                <CarouselItem key={index}>
                                    <div className='p-1'>
                                        <Card>
                                            <CardContent className='flex aspect-square items-center justify-center p-6'>
                                                <img
                                                    src={imageUrls[index]}
                                                    alt={`image-${index}`}
                                                    style={{ objectFit: 'fill', width: '100%', height: '100%' }}
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    <div className='flex mb-20 w-full ml-8 flex-col items-start'>
                        {caption && (
                            <div className='flex'>
                                <p
                                    onClick={toggleExpand}
                                    className={`leading-7 ${
                                        !expanded ? 'line-clamp-2' : ''
                                    } [&:not(:first-child)]:mt-6 transition-all duration-300 animate-expand-collapse`}
                                >
                                    <span className='text-lg font-semibold'>{author.username}</span> {caption}
                                </p>
                            </div>
                        )}
                        {tags && tags.length !== 0 && (
                            <p className='text-sm text-muted-foreground'>{tags && tags.map((tag: string) => tag)}</p>
                        )}
                    </div>
                </div>

                <div className='w-1/2'>
                    <div className='flex flex-col h-full'>
                        {/* First div */}
                        <div className='flex items-center gap-2 p-4 h-1/20'>
                            <Avatar>
                                <AvatarImage src={post?.author.imageUrl} alt={post?.author.username} />
                                <AvatarFallback>{post?.author.username.split('')[0]}</AvatarFallback>
                            </Avatar>
                            <p className='text-lg font-bold'>{post?.author.username}</p>
                        </div>

                        <Separator />

                        {/* Center div */}
                        <div className='p-4 flex justify-between flex-grow h-9/20'>
                            <div className='flex flex-col w-full mb-2 overflow-y-auto no-scrollbar'>
                                <ScrollArea className='h-96 w-full'>
                                    {comments && comments.length
                                        ? comments.map((comment: CommentResponse) => (
                                              <SingleComment getComments={getComments} key={comment.id} {...comment} />
                                          ))
                                        : error
                                        ? error
                                        : 'No comments'}
                                </ScrollArea>
                            </div>
                        </div>

                        <Separator />

                        {/* Last div */}
                        <div className='p-4 flex flex-col items-start justify-between h-1/20'>
                            <div className='flex space-x-4 w-full'>
                                <div className='flex justify-between w-full'>
                                    <div className='flex'>
                                        <Button
                                            className='transition-colors duration-300 ease-in-out'
                                            onClick={handleLikeButtonClick}
                                            variant={'ghost'}
                                        >
                                            {isLiked ? <Heart fill='#dc2626' color='#dc2626' /> : <Heart />}
                                        </Button>
                                        <Button variant={'ghost'}>
                                            <MessageCircle />
                                        </Button>
                                        <Button variant={'ghost'}>
                                            <Send />
                                        </Button>
                                    </div>
                                    {author.userId !== currentUser?.userId && (
                                        <div>
                                            <Save setIsSaved={setIsSaved} isSaved={isSaved} postId={postId} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <span className='text-lg font-semibold mt-3'>{likeCount} Likes</span>
                            <span className='text-sm text-muted-foreground mb-3'>{timeAgo}</span>
                            <Separator />
                            <div className='w-full mt-4'>
                                <AddCommentForm
                                    getComments={getComments}
                                    postId={postId}
                                    postAuthorId={post && post.author.userId ? post.author.userId : ''}
                                    handleNotification={handleNotification}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Comment;
