import React from 'react';
import { toast } from '../ui/use-toast';
import useRequest from '@/hooks/useRequest';

const ResendOtp = ({ email, resetTimer }: ResendOtpProps) => {
    const { doRequest, errors } = useRequest({
        url: '/api/users/resend',
        method: 'post',
        body: {
            email: email,
        },
        onSuccess: () => {
            const otpData = {
                email: email,
                expires: Date.now() + 30000,
            };
            localStorage.setItem('otpDetails', JSON.stringify(otpData));

            toast({
                description: 'otp resent',
            });

            resetTimer();
        },
    });

    const handleResend = () => {
        doRequest();
    };

    return (
        <p className=' text-center'>
            Didn't get a security code?{' '}
            <span onClick={handleResend} className='underline'>
                Resend it.
            </span>
        </p>
    );
};

export default ResendOtp;
