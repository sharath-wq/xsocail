import React, { Dispatch, SetStateAction, useState } from 'react';
import Like from './like/Like';
import Comment from './comment/Comment';
import Share from './share/Share';
import Save from './save/Save';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import { Author } from '@/types/comment';
import { toast } from '@/components/ui/use-toast';

const Actions = ({
    id,
    likes,
    setLikeCount,
    setCommentCount,
    likeCount,
    author,
    handleNotification,
    caption,
    imageUrls,
    tags,
}: {
    id: string;
    likes: string[];
    setLikeCount: Dispatch<SetStateAction<number>>;
    setCommentCount: Dispatch<SetStateAction<number>>;
    likeCount: number;
    author: Author;
    handleNotification: (senderId: string, receiverId: string) => void;
    caption: string;
    commentCount: number;
    imageUrls: string[];
    tags: string[];
}) => {
    const { currentUser } = useUser();
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const [isLiked, setIsLiked] = useState<boolean>(currentUser ? likes.includes(currentUser?.userId) : false);

    const handleLikeButtonClick = async () => {
        try {
            await axios.patch(`/api/posts/${isLiked ? 'dislike' : 'like'}/${id}`);
            if (!isLiked) {
                handleNotification(currentUser!.userId, author.userId);
            }
            setIsLiked((prevIsLiked) => !prevIsLiked);
            setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
        } catch (error: any) {
            console.log(error);
            toast({ title: 'An Error Occured', description: error });
        }
    };

    return (
        <div className='flex justify-between w-full'>
            <div>
                <Like
                    handleLikeButtonClick={handleLikeButtonClick}
                    setIsLiked={setIsLiked}
                    isLiked={isLiked}
                    setLikeCount={setLikeCount}
                    id={id}
                    likes={likes}
                />
                <Comment
                    caption={caption}
                    imageUrls={imageUrls}
                    tags={tags}
                    handleLikeButtonClick={handleLikeButtonClick}
                    isLiked={isLiked}
                    setCommentCount={setCommentCount}
                    postId={id}
                    likeCount={likeCount}
                    author={author}
                    isSaved={isSaved}
                    setIsSaved={setIsSaved}
                    handleNotification={handleNotification}
                />
                <Share id={id} />
            </div>
            {author.userId !== currentUser?.userId && (
                <div>
                    <Save isSaved={isSaved} setIsSaved={setIsSaved} postId={id} />
                </div>
            )}
        </div>
    );
};

export default Actions;
