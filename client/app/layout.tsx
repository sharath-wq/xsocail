'use client';

import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { useRouter } from 'next/navigation';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const { currentUser, error }: any = await getUser();

            if (currentUser) {
                router.push('/home');
                setIsSuccess(true);

                return;
            }

            if (!currentUser) {
                router.push('/auth/login');
                setIsSuccess(true);

                return;
            }
        })();
    }, [router]);

    return (
        <html lang='en'>
            <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    {!isSuccess ? <div>Loading...</div> : children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}

async function getUser() {
    try {
        const { data } = await axios.get('/api/users/currentuser');

        return {
            currentUser: data.currentUser,
            error: null,
        };
    } catch (e) {
        const error = e as AxiosError;

        return {
            currentUser: null,
            error,
        };
    }
}
