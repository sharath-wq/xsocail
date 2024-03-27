import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { INotification } from '@/types/notifications';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TimeAgo from 'react-timeago';

const Notification = ({ notification }: { notification: INotification }) => {
    const timeDifference: number = Date.now() - new Date(notification.createdAt).getTime();

    let timeAgo: string | React.ReactNode;
    if (timeDifference < 60000) {
        timeAgo = 'Just now';
    } else {
        timeAgo = <TimeAgo date={notification.createdAt} />;
    }

    return (
        <div className='flex gap-2 justify-between items-center'>
            <Link href={`/user/${notification.senderId}`} className='flex w-[90%] gap-5'>
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={notification.sender.imageUrl} alt='@shadcn' />
                    <AvatarFallback>{notification.sender.username.split('')[0]}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col justify-center'>
                    <CardTitle className='text-base font-medium '>
                        <span className='text-lg font-semibold'>{notification.sender.username} </span>
                        {notification.content}
                    </CardTitle>
                    <CardDescription>{timeAgo}</CardDescription>
                </div>
            </Link>
            <div className='w-[10%]'>
                {notification.type !== 'Follow' && notification.type !== 'Warning' && (
                    <Link href={`/post/view/${notification.postId}`}>
                        <img className='w-12 h-12 object-contain' src={notification?.post?.imageUrls[0]} alt='' />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Notification;
