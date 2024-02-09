import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const ForgotPage: React.FC = () => {
    return (
        <div className='flex flex-col items-center'>
            <div className='border  p-8 m-2 rounded-md shadow-md flex flex-col w-full sm:w-[400px] shadcn-bg-white shadcn-rounded-md'>
                <h3 className='text-2xl font-bold mb-10 text-center'>LOGO</h3>

                <p className='text-gray-600 mb-4 text-center'>
                    Enter your email and we'll send you a link to get back into your account.
                </p>

                <Input
                    type='text'
                    placeholder='Email'
                    className='border rounded-md px-3 py-2 mb-2 outline-none shadcn-bg-slate-300 shadcn-focus:bg-white'
                />

                <Button className='px-4 py-4 mt-4 rounded-md mb-4'>Send Login Link</Button>

                <div className='flex items-center justify-center'>
                    <Button variant={'outline'} asChild className='w-full'>
                        <Link href='#'>Back to Login</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPage;
