'use client';

import ResendOtp from '@/components/ResendOtp/ResendOtp';
import { ButtonLoading } from '@/components/button/LoadingButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import useRequest from '@/hooks/useRequest';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const VerifyOtpPage: React.FC = () => {
    const router = useRouter();
    const [otpData, setOtpData] = useState<OtpData | null>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [otp, setOtp] = useState('');
    const [isSubmiting, setisSubmiting] = useState(false);

    useEffect(() => {
        const storedOtpDetails = typeof window !== 'undefined' ? localStorage?.getItem('otpDetails') : null;
        setOtpData(storedOtpDetails ? JSON.parse(storedOtpDetails) : null);

        const findTimeLeft = () => {
            if (otpData) {
                const msLeft = new Date(otpData.expires).getTime() - new Date().getTime();
                const roundedTimeLeft = Math.max(0, Math.round(msLeft / 1000));
                setTimeLeft(roundedTimeLeft);
            }
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [otpData]);

    const { doRequest, errors } = useRequest({
        url: '/api/users/verify',
        method: 'post',
        body: {
            email: otpData?.email,
            otp: otp,
        },
        onSuccess: () => {
            setisSubmiting(false);
            localStorage.removeItem('otpDetails');
            setTimeLeft(30);
            toast({
                description: 'Otp Verifed',
            });
            router.replace('/auth/login');
        },
    });

    const handleSubmit = () => {
        if (otpData) {
            doRequest();
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='border p-8 m-2 rounded-md shadow-md flex flex-col w-full sm:w-[400px] shadcn-bg-white shadcn-rounded-md'>
                {errors}
                <h3 className='text-2xl font-bold mb-10 text-center'>
                    <Badge>{timeLeft} seconds left</Badge>
                </h3>

                <p className='mb-4 text-center'>Enter the security code sent to your email.</p>

                <Input
                    type='text'
                    placeholder='Enter OTP'
                    className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                {isSubmiting ? (
                    <ButtonLoading />
                ) : (
                    <Button onClick={handleSubmit} className='px-4 py-4 mt-4 rounded-md mb-4'>
                        Confirm
                    </Button>
                )}

                <p className=' mb-4 text-center'>Please wait a few minutes before you try again.</p>

                {otpData && timeLeft === 0 && <ResendOtp resetTimer={() => setTimeLeft(30)} email={otpData.email} />}

                <div className='flex items-center justify-center mt-4'>
                    <Button variant={'outline'} asChild className='w-full'>
                        <Link href='/auth/login'>Back to Login</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtpPage;
