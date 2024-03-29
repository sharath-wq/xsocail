import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, UserData } from '@/types/user';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Video } from 'lucide-react';

const Conversation = ({
    conversation,
    currentUser,
    currentChat,
    unreadCounts,
}: {
    conversation: any;
    currentUser: User | null;
    currentChat: any;
    unreadCounts: number;
}) => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const friendId = conversation.members.find((m: string) => m !== currentUser?.userId);

            if (friendId) {
                try {
                    const { data } = await axios.get(`/api/users/${friendId}`);
                    setUser(data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        fetchUser();
    }, [currentUser, conversation]);

    const invite = async () => {
        if (!user) return;

        const { ZegoUIKitPrebuilt } = await import('@zegocloud/zego-uikit-prebuilt');

        const userID = currentUser!.userId.toString();
        const userName = 'userName' + userID;
        const appID = 850377586;
        const serverSecret = process.env.ZEGO_CLOUD_SERVER_SECRET!;
        const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, currentUser!.userId, userID, userName);

        const zp = ZegoUIKitPrebuilt.create(TOKEN);
        // @ts-ignore
        zp.addPlugins({ ZIM: ZegoUIKitPrebuilt.ZIM });

        const targetUser = {
            userID: user.id,
            userName: user.username,
        };

        zp.sendCallInvitation({
            callees: [targetUser],
            callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
            timeout: 60,
        })
            .then((res) => {
                console.warn(res);
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    return (
        <div
            className={`flex items-center p-2 cursor-pointer mt-5 rounded-2xl hover:bg-secondary ${
                currentChat?.id === conversation.id ? 'bg-secondary' : ''
            }`}
        >
            <Avatar>
                <AvatarImage src={user?.imageUrl} alt='@shadcn' />
                <AvatarFallback>{user?.username.split('')[0]}</AvatarFallback>
            </Avatar>

            <div className='flex flex-col'>
                <span className='font-bold ml-5 flex gap-2'>
                    {user?.username}

                    {unreadCounts > 0 && (
                        <div className='flex items-center justify-center'>
                            <div className='w-[20px] h-[20px] bg-red-600 rounded-full text-xs flex items-center justify-center'>
                                {unreadCounts}
                            </div>
                        </div>
                    )}
                </span>
                <span className='font-light ml-5'>
                    {conversation.recentMessage
                        ? conversation.recentMessage.length > 20
                            ? conversation.recentMessage.substring(0, 20) + '...'
                            : conversation.recentMessage
                        : 'Image'}
                </span>
            </div>
            <div className='ml-auto'>
                <Video onClick={invite} />
            </div>
        </div>
    );
};

export default Conversation;
