import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ChevronRight, CopyIcon, MoreVertical } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Separator } from '@/components/ui/separator';
import { PostProps } from '@/types/post';
import { useUser } from '@/context/userContext';
import useRequest from '@/hooks/useRequest';
import { toast } from '../ui/use-toast';

import TimeAgo from 'react-timeago';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import Actions from './actions/Actions';
import { usePost } from '@/context/postContext';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { ScrollArea } from '../ui/scroll-area';
import { reasonsToReport } from '@/constants';

const Post = ({
    author,
    caption,
    comments,
    createdAt,
    id,
    imageUrls,
    likes,
    tags,
    isEdited,
    handleNotification,
}: PostProps) => {
    const { currentUser } = useUser();
    const [likeCount, setLikeCount] = useState(likes.length);
    const [commentCount, setCommentCount] = useState(comments.length);

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        doRequest();
    };

    const { getPosts } = usePost();

    const { doRequest, errors } = useRequest({
        url: `/api/posts/${id}`,
        method: 'delete',
        body: {},
        onSuccess: () => {
            toast({
                description: 'Post Deleted',
            });
            getPosts();
        },
    });

    const timeDifference: number = Date.now() - new Date(createdAt).getTime();

    let timeAgo: string | React.ReactNode;
    if (timeDifference < 60000) {
        timeAgo = 'Just now';
    } else {
        timeAgo = <TimeAgo date={createdAt} />;
    }

    const handleUnfollow = async () => {
        try {
            await axios.put(`/api/users/unfollow/${author.userId}`);
            toast({
                description: `unfollowed`,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const hanldeReport = async (reason: string) => {
        try {
            await axios.post(`/api/posts/reports`, {
                postId: id,
                reason: reason,
            });
            toast({
                title: 'Reported',
                description: `Post Reported with the reason ${reason}`,
            });
        } catch (error: any) {
            console.log(error);
            toast({
                title: 'Error reporting post',
                description: `${error}`,
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between'>
                    <Link href={`/user/${author.userId}`} className='flex gap-4'>
                        <Avatar>
                            <AvatarImage src={author.imageUrl} alt={author.username} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>
                                {author.username}{' '}
                                {isEdited && <span className='text-sm text-muted-foreground'>(edited)</span>}
                            </CardTitle>
                            <CardDescription>{timeAgo}</CardDescription>
                        </div>
                    </Link>

                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost'>
                                    <MoreVertical />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    {currentUser?.userId !== author.userId && (
                                        <DropdownMenuItem>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <span onClick={(e) => e.stopPropagation()} className='text-red-500'>
                                                        Report
                                                    </span>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Report</AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <ScrollArea className='h-auto w-full rounded-md border'>
                                                            <div className='p-4'>
                                                                <h4 className='mb-6 text-lg font-bold leading-none'>
                                                                    Why are you reporting the post
                                                                </h4>
                                                                {reasonsToReport.map((reason, _) => (
                                                                    <>
                                                                        <div
                                                                            key={_}
                                                                            className='text-base flex justify-between'
                                                                        >
                                                                            {reason}
                                                                            <ChevronRight
                                                                                onClick={() => {
                                                                                    hanldeReport(reason);
                                                                                }}
                                                                                className='cursor-pointer'
                                                                            />
                                                                        </div>
                                                                        {_ < reasonsToReport.length - 1 && (
                                                                            <Separator className='my-3' />
                                                                        )}
                                                                    </>
                                                                ))}
                                                            </div>
                                                        </ScrollArea>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuItem>
                                    )}
                                    {currentUser?.userId !== author.userId && (
                                        <DropdownMenuItem>
                                            <span onClick={handleUnfollow} className='text-red-500'>
                                                Unfollow
                                            </span>
                                        </DropdownMenuItem>
                                    )}
                                    {currentUser?.userId === author.userId && (
                                        <DropdownMenuItem>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <span onClick={(e) => e.stopPropagation()} className='text-red-500'>
                                                        Delete
                                                    </span>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your
                                                            post.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleDelete}>
                                                            Confirm
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <span onClick={(e) => e.stopPropagation()}>Share</span>
                                            </DialogTrigger>
                                            <DialogContent className='sm:max-w-md'>
                                                <DialogHeader>
                                                    <DialogTitle>Share link</DialogTitle>
                                                    <DialogDescription>
                                                        Anyone who has this link will be able to view this.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div
                                                    onClick={(e) => e.stopPropagation()}
                                                    className='flex items-center space-x-2'
                                                >
                                                    <div className='grid flex-1 gap-2'>
                                                        <Label htmlFor='link' className='sr-only'>
                                                            Link
                                                        </Label>
                                                        <Input
                                                            id='link'
                                                            defaultValue={`http://xsocial.dev/post/view/${id}`}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <Button type='submit' size='sm' className='px-3'>
                                                        <span onClick={(e) => e.stopPropagation()} className='sr-only'>
                                                            Copy
                                                        </span>
                                                        <CopyIcon className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                                <DialogFooter className='sm:justify-start'>
                                                    <DialogClose asChild>
                                                        <Button type='button' variant='secondary'>
                                                            Close
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='w-full'>
                <Carousel className='w-full '>
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
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardContent>
            <CardFooter className='flex flex-col'>
                <Actions
                    caption={caption}
                    commentCount={commentCount}
                    imageUrls={imageUrls}
                    tags={tags}
                    likeCount={likeCount}
                    setCommentCount={setCommentCount}
                    setLikeCount={setLikeCount}
                    id={id}
                    author={author}
                    likes={likes}
                    handleNotification={handleNotification}
                />
                <Separator className='my-2' />
                <div className='flex w-full ml-8 flex-col items-start'>
                    {likeCount !== 0 && <div className='text-lg font-semibold'>{likeCount} Likes</div>}
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
                    {commentCount !== 0 && (
                        <p className='text-xl text-muted-foreground'>View all {commentCount} comments</p>
                    )}
                    {tags && tags.length !== 0 && (
                        <p className='text-sm text-muted-foreground'>{tags && tags.map((tag: string) => tag)}</p>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export default Post;
