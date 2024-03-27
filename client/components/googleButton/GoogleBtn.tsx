import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { UserAuth } from '@/context/authContext';
import useRequest from '@/hooks/useRequest';
import { useUser } from '@/context/userContext';

type GoogleBtnProps = {
    text: string;
    icon: React.ReactNode;
};

const GoogleBtn = ({ text, icon }: GoogleBtnProps) => {
    const router = useRouter();

    const { user, googleSignIn } = UserAuth();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();

            const googleUser = {
                email: user.email,
                username: user.displayName.split(' ')[0] + Date.now().toString().slice(9),
                fullName: user.displayName,
                imageUrl: user.photoURL,
            };

            doRequest(googleUser);
        } catch (error) {
            console.log(error);
        }
    };

    const { getCurrentUser } = useUser();

    const { doRequest, errors } = useRequest({
        url: '/api/users/google',
        method: 'post',
        body: {},
        onSuccess: () => {
            getCurrentUser();
            router.push('/home');
        },
    });

    return (
        <Button onClick={handleGoogleSignIn} className='mr-2 flex gap-2'>
            {errors}
            {icon}
            {`${text}`}
        </Button>
    );
};

export default GoogleBtn;
