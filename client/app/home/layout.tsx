import Sidebar from '@/components/sidebar/Sidebar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='relative'>
            <div className='float-left w-64 sm:w-80'>
                <Sidebar />
            </div>
            <div className='ml-4 p-4 sm:ml-80'>{children}</div>
        </div>
    );
}
