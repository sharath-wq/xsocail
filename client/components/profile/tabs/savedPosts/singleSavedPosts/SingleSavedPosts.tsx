import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import React from 'react';

const SingleSavedPosts = ({
    id,
    imageUrl,
    fetchUserSavedPosts,
}: {
    imageUrl: string;
    id: string;
    fetchUserSavedPosts: () => void;
}) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className='p-4 rounded-md'>
                    <img src={imageUrl} alt='Post' className='w-full h-60 object-contain mb-4 rounded-md' />
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className='w-64'>
                <ContextMenuItem inset>
                    <span>Unsave</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default SingleSavedPosts;
