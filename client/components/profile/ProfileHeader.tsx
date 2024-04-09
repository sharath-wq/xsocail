import React, { useEffect, useState } from 'react';
import UserImage from '@/components/profile/UserImage';
import { Button } from '@/components/ui/button';
import { AlertCircle, Settings, X } from 'lucide-react';
import EditProfile from '@/components/profile/EditProfile';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import {
    AlertDialog,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogCancel,
    AlertDialogAction,
} from '../ui/alert-dialog';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { reasonsToReportUser } from '@/constants';

type ProfileHeaderProps = {
    id: string;
    own: boolean;
    imageUrl: string;
    username: string;
    fullName: string;
    bio: string;
    posts: string[];
    following: string[];
    followers: string[];
    email: string;
    handleNotification?: (senderId: string, receiverId: string) => void;
};

const ProfileHeader = ({
    own,
    id,
    username,
    imageUrl,
    fullName,
    bio,
    posts,
    followers,
    following,
    email,
    handleNotification,
}: ProfileHeaderProps) => {
    const editUserData = {
        username,
        bio,
        fullName,
        email,
    };

    const { currentUser } = useUser();
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        setIsFollowing((currentUser && currentUser.following?.includes(id)) || false);
    }, [currentUser, id]);

    const handleClick = async () => {
        try {
            await axios.put(`/api/users/${isFollowing ? 'unfollow' : 'follow'}/${id}`);
            toast({
                description: `${isFollowing ? 'unfollowed' : 'followed'}`,
            });

            if (!isFollowing) {
                handleNotification && handleNotification(currentUser!.userId, id);
            }

            setIsFollowing((prev) => !prev);
        } catch (error) {
            console.log(error);
        }
    };

    const hanldeReport = async (reason: string) => {
        try {
            await axios.post(`/api/users/reports`, {
                userId: id,
                reporterId: currentUser?.userId,
                reason: reason,
            });
            toast({
                title: 'Reported',
                description: `User Reported with the reason ${reason}`,
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
        <div className='flex flex-col items-center p-4 md:flex-row'>
            <div className='flex items-center mb-4 md:mb-0 md:mr-8'>
                <UserImage own={own} username={username} imageUrl={imageUrl} />
            </div>

            <div className='flex flex-col gap-5 mt-6 md:mt-0'>
                <div className='flex flex-col md:flex-row gap-5 items-center'>
                    <h1 className='text-2xl font-bold mb-2 md:mb-0'>{username}</h1>
                    {own && <EditProfile {...editUserData} />}

                    {own ? (
                        <Button variant={'secondary'} className='md:ml-auto'>
                            <Settings />
                        </Button>
                    ) : (
                        <div className='flex gap-2'>
                            <Button onClick={handleClick} variant={'secondary'}>
                                {isFollowing ? 'unfollow' : 'follow'}
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger className='flex justify-between' asChild>
                                    <Button variant='destructive' onClick={(e) => e.stopPropagation()}>
                                        Report
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <div className='flex justify-between'>
                                            <AlertDialogTitle>Report</AlertDialogTitle>
                                            <AlertDialogCancel className='justify-end'>
                                                <X />
                                            </AlertDialogCancel>
                                        </div>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <ScrollArea className='h-auto w-full rounded-md border'>
                                            <div className='p-4'>
                                                {reasonsToReportUser.map((reason, index) => (
                                                    <div key={reason} className='text-base flex justify-between'>
                                                        {reason}
                                                        <AlertDialogAction>
                                                            <AlertCircle
                                                                onClick={() => hanldeReport(reason)}
                                                                className='cursor-pointer'
                                                            />
                                                        </AlertDialogAction>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </div>
                <span className='text-md font-normal mb-2 md:mb-0'>{fullName}</span>

                <div className='flex flex-wrap gap-4'>
                    <div className='text-center mb-2'>
                        <span className='block font-bold text-lg'>{posts?.length}</span>
                        <span className=''>Posts</span>
                    </div>
                    <div className='text-center mb-2'>
                        <span className='block font-bold text-lg'>{followers?.length}</span>
                        <span className=''>Followers</span>
                    </div>
                    <div className='text-center'>
                        <span className='block font-bold text-lg'>{following?.length}</span>
                        <span className=''>Following</span>
                    </div>
                </div>

                <div className=''>
                    <p className='text-wrap'>{bio}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
