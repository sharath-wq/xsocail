'use client';

import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/context/userContext';

import { AuthContextProvider } from '@/context/authContext';

export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang='en'>
            <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
                {/* @ts-ignore */}
                <UserProvider>
                    <AuthContextProvider>
                        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                            {children}
                            <Toaster />
                        </ThemeProvider>
                    </AuthContextProvider>
                </UserProvider>
            </body>
        </html>
    );
};

export default RootLayout;
