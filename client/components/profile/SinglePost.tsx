import React from 'react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';

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
import useRequest from '@/hooks/useRequest';
import { toast } from '../ui/use-toast';
import Link from 'next/link';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CopyIcon } from 'lucide-react';
import Image from 'next/image';

const SinglePost = ({
    imageUrl,
    id,
    fetchUserPosts,
    own,
}: {
    imageUrl: string;
    id: string;
    fetchUserPosts: () => void;
    own: boolean;
}) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        doRequest();
    };

    const { doRequest, errors } = useRequest({
        url: `/api/posts/${id}`,
        method: 'delete',
        body: {},
        onSuccess: () => {
            toast({
                description: 'Post Deleted',
            });
            fetchUserPosts();
        },
    });

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className='p-4 rounded-md'>
                    <Link href={`/post/view/${id}`}>
                        <Image
                            objectFit='contain'
                            width={100}
                            height={100}
                            src={imageUrl}
                            alt='Post'
                            className='w-full h-60 object-contain mb-4 rounded-md'
                        />
                    </Link>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className='w-64'>
                {own && (
                    <>
                        <ContextMenuItem inset>
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
                                            This action cannot be undone. This will permanently delete your post.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </ContextMenuItem>
                        <ContextMenuItem inset>
                            <Link href={`/post/${id}`}>Edit</Link>
                        </ContextMenuItem>
                    </>
                )}
                <ContextMenuItem inset>
                    <Dialog>
                        <DialogTrigger asChild>
                            <span onClick={(e) => e.stopPropagation()}>Share</span>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-md'>
                            <DialogHeader>
                                <DialogTitle>Share link</DialogTitle>
                                <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
                            </DialogHeader>
                            <div onClick={(e) => e.stopPropagation()} className='flex items-center space-x-2'>
                                <div className='grid flex-1 gap-2'>
                                    <Label htmlFor='link' className='sr-only'>
                                        Link
                                    </Label>
                                    <Input id='link' defaultValue={`http://xsocial.dev/post/view/${id}`} readOnly />
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
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default SinglePost;
