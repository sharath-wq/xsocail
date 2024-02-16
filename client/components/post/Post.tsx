import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bookmark, Heart, MessageCircle, MoreVertical, Send } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { PostData } from '@/types/post';

const Post = ({ author, caption, comments, createdAt, id, imageUrls, likes, tags }: PostData) => {
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        <Avatar>
                            <AvatarImage src={author.imageUrl} alt={author.username} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{author.username}</CardTitle>
                            <CardDescription>Just Now</CardDescription>
                        </div>
                    </div>

                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost'>
                                    <MoreVertical />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <span className='text-red-500'>Report</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span className='text-red-500'>Unfollow</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Copy Link</span>
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
                                            <Image
                                                src={imageUrls[index]}
                                                alt={'image'}
                                                width={800}
                                                height={600}
                                                priority={false}
                                                placeholder='empty'
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
                <div className='flex justify-between w-full'>
                    <div>
                        <Button variant={'ghost'}>
                            <Heart />
                        </Button>
                        <Button variant={'ghost'}>
                            <MessageCircle />
                        </Button>
                        <Button variant={'ghost'}>
                            <Send />
                        </Button>
                    </div>
                    <div>
                        <Button variant={'ghost'}>
                            <Bookmark />
                        </Button>
                    </div>
                </div>
                <Separator className='my-2' />
                <div className='flex w-full ml-8 flex-col items-start'>
                    <span className='text-3xl'>{caption}</span>
                    <span className='text-2xl'>{likes?.length} Likes</span>
                    <span className='text-sm'>{comments?.length} Comments</span>
                    <span className='text-sm'>{tags && tags.map((tag: string) => tag)}</span>
                </div>
            </CardFooter>
        </Card>
    );
};

export default Post;
