import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useRequest from '@/hooks/useRequest';
import { toast } from '../ui/use-toast';
import { useUser } from '@/context/userContext';
import { ButtonLoading } from '../button/LoadingButton';

type UserImageProps = {
    username: string;
    imageUrl: string;
    own: boolean;
};

const UserImage = ({ username, imageUrl, own }: UserImageProps) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmiting, setIsSubmiting] = useState(false);

    const { getCurrentUser, currentUser } = useUser();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleEditButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // Trigger file input when the button is clicked
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const { doRequest, errors } = useRequest({
        url: `/api/users/image/${currentUser?.userId}`,
        method: 'post',
        body: {},
        onSuccess: () => {
            toast({
                description: 'Profile Image updated',
            });
            getCurrentUser();
            setIsSubmiting(false);
        },
        contentType: 'multipart/form-data',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        doRequest({ file: selectedImage });
    };

    return (
        <div className='w-52 h-52 justify-center items-center flex flex-col'>
            {errors}
            <Avatar className='w-full h-full'>
                {selectedImage ? (
                    <AvatarImage
                        src={URL.createObjectURL(selectedImage)}
                        alt={username}
                        className='w-full h-full object-cover'
                    />
                ) : (
                    <AvatarImage src={imageUrl} alt={username} className='w-full h-full object-cover' />
                )}
                <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>

            {own && (
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-5xl'>
                    <input
                        name='file'
                        type='file'
                        accept='image/*'
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />

                    <Button variant={'outline'} className='mt-2 p-2 cursor-pointer' onClick={handleEditButtonClick}>
                        Change Image
                    </Button>

                    {selectedImage &&
                        (isSubmiting ? (
                            <ButtonLoading />
                        ) : (
                            <Button variant={'outline'} className='p-2 cursor-pointer' type='submit'>
                                Update Image
                            </Button>
                        ))}
                </form>
            )}
        </div>
    );
};

export default UserImage;
