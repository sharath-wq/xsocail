import { ModeToggle } from '@/components/ui/modeToggle';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex items-center justify-center h-screen relative'>
            <div className='absolute top-5 right-5 sm:block hidden'>
                <ModeToggle />
            </div>
            {children}
        </div>
    );
}
