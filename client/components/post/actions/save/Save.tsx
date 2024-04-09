import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@/context/userContext';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Bookmark } from 'lucide-react';
import React, { useEffect, SetStateAction, Dispatch } from 'react';

const Save = ({
    postId,
    isSaved,
    setIsSaved,
}: {
    postId: string;
    isSaved: boolean;
    setIsSaved: Dispatch<SetStateAction<boolean>>;
}) => {
    const { currentUser } = useUser();

    useEffect(() => {
        setIsSaved((currentUser && currentUser.savedPosts?.includes(postId)) || false);
    }, [currentUser, postId]);

    const handleLikeButtonClick = async () => {
        try {
            await axios.put(`/api/users/${isSaved ? 'unsave' : 'save'}/${postId}`);
            toast({
                description: `Post ${isSaved ? 'unsaved' : 'saved'}`,
            });
            setIsSaved((prevIsSaved) => !prevIsSaved);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button onClick={handleLikeButtonClick} variant='ghost'>
            {isSaved ? <Bookmark color='#3b82f6' fill='#3b82f6' /> : <Bookmark />}
        </Button>
    );
};

export default Save;
