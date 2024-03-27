'use client';

import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

const Like = ({
    isLiked,
    handleLikeButtonClick,
}: {
    id: string;
    likes: string[];
    setLikeCount: Dispatch<SetStateAction<number>>;
    setIsLiked: Dispatch<SetStateAction<boolean>>;
    isLiked: boolean;
    handleLikeButtonClick: () => void;
}) => {
    return (
        <Button className='transition-colors duration-300 ease-in-out' onClick={handleLikeButtonClick} variant={'ghost'}>
            {isLiked ? <Heart fill='#dc2626' color='#dc2626' /> : <Heart />}
        </Button>
    );
};

export default Like;
