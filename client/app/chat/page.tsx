'use client';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import ChatOnline from '@/components/chat/chatOnline/ChatOnline';
import Conversation from '@/components/chat/conversation/Conversation';
import Message from '@/components/chat/message/Message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import noMessagesBg from '@/public/no-message.svg';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CurrentChat, IMessage } from '@/types/message';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { MessageValidation } from '@/lib/validation';
import { Socket, io } from 'socket.io-client';
import { ImagePlus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { CldUploadWidget } from 'next-cloudinary';

const ChatPage = () => {
    const [conversations, setConversations] = useState<any>([]);
    const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);
    const [messages, setMessages] = useState<IMessage[] | []>([]);
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState<any>([]);
    const socket = useRef<Socket>();
    const { currentUser } = useUser();
    const scrollRef: any = useRef();
    const router = useRouter();
    const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>({});

    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        if (!currentUser) {
            router.replace('/auth/login');
        } else {
            router.replace('/chat');
        }
    }, [currentUser, router]);

    useEffect(() => {
        socket.current = io('wss://www.scportfolio.online/chat');
        socket.current.on('getMessage', (data) => {
            const arrivalMessage = {
                sender: data.senderId,
                text: data.text,
                conversationId: data.conversationId,
                createdAt: Date.now(),
            };

            setArrivalMessage(arrivalMessage);

            setConversations((prevConversations: any) => {
                return prevConversations.map((conversation: any) => {
                    if (conversation.id === arrivalMessage.conversationId) {
                        return {
                            ...conversation,
                            recentMessage: arrivalMessage.text,
                            updatedAt: new Date(),
                        };
                    }
                    return conversation;
                });
            });

            setUnreadCounts((prevUnreadCounts: { [conversationId: string]: number }) => {
                const updatedUnreadCounts: { [conversationId: string]: number } = { ...prevUnreadCounts };

                if (arrivalMessage) {
                    const conversationId = arrivalMessage.conversationId;
                    const isCurrentChat = currentChat && currentChat.id === conversationId;

                    if (!isCurrentChat) {
                        updatedUnreadCounts[conversationId] = (updatedUnreadCounts[conversationId] || 0) + 1;
                    }
                }

                return updatedUnreadCounts;
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current?.emit('addUser', currentUser && currentUser.userId);
        socket.current?.on('getUsers', (users) => {
            currentUser && setOnlineUsers(currentUser.following.filter((f) => users.some((u: any) => u.userId === f)));
        });
    }, [currentUser, socket.current]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const { data } = await axios.get(`/api/chat/conversation/${currentUser && currentUser.userId}`);

                const updatedUnreadCounts: { [conversationId: string]: number } = {};
                data.forEach((conversation: any) => {
                    if (conversation.unreadCount) {
                        updatedUnreadCounts[conversation.id] = conversation.unreadCount;
                    }
                });

                setUnreadCounts(updatedUnreadCounts);
                setConversations(data);
            } catch (error: any) {
                console.log(error);
                toast({ title: 'An Error Occured', description: error });
            }
        };

        getConversations();
    }, [currentUser?.userId]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const { data } = await axios.get(`/api/chat/message/${currentChat?.id}`);
                setMessages(data);
            } catch (error: any) {
                console.log(error);
                toast({ title: 'An Error Occured', description: error });
            }
        };
        getMessages();
    }, [currentChat]);

    // 1. Define your form.
    const form = useForm<z.infer<typeof MessageValidation>>({
        resolver: zodResolver(MessageValidation),
        defaultValues: {
            text: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof MessageValidation>) {
        const sendMessage = async () => {
            const message = {
                sender: currentUser?.userId,
                text: values.text,
                conversationId: currentChat?.id,
                imageUrl: imageUrl,
            };

            const receiverId = currentChat?.members?.find((m) => m !== currentUser?.userId);

            socket.current?.emit('sendMessage', {
                senderId: currentUser?.userId,
                receiverId,
                imageUrl: imageUrl,
                text: values.text,
                conversationId: currentChat?.id,
            });

            // Update existing conversation with new message details
            setConversations((prevConversations: any) => {
                return prevConversations.map((conversation: any) => {
                    if (conversation.id === message.conversationId) {
                        return {
                            ...conversation,
                            recentMessage: message.text,
                            updatedAt: new Date(),
                        };
                    }
                    return conversation;
                });
            });

            try {
                const { data } = await axios.post('/api/chat/message', message);
                setMessages([...messages, data]);
                form.setValue('text', '');
                setImageUrl('');
            } catch (error: any) {
                console.log(error);
                toast({ title: 'An Error Occured', description: error });
            }
        };

        sendMessage();
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sortedConversations = conversations.slice().sort((a: any, b: any) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    const onUploadSuccessHandler = useCallback((response: any, { widget }: any) => {
        const croppedImageUrl = response?.info?.secure_url;
        setImageUrl(croppedImageUrl);
        widget.close();
    }, []);

    const onUploadErrorHandler = useCallback((error: any) => {
        toast({
            title: 'Error uploading Image',
            description: 'try again later',
        });
    }, []);

    const handleCurrentChatClick = async (c: any) => {
        try {
            const { data } = await axios.patch(`/api/chat/message/mark-read`, {
                cId: c.id,
                userId: currentUser!.userId,
            });

            setUnreadCounts((prevUnreadCounts) => {
                return {
                    ...prevUnreadCounts,
                    [c.id]: 0,
                };
            });

            setCurrentChat(c);
        } catch (error: any) {
            console.log(error);
            toast({ title: 'An Error Occured', description: error });
        }
    };

    return (
        currentUser && (
            <div className='flex flex-col h-screen overflow-hidden sm:flex-row'>
                <div className='sm:flex-2 border-r'>
                    <div className='p-3 h-80vh'>
                        <Input placeholder='Search for friends' />
                        <div className='h-full overflow-y-scroll no-scrollbar'>
                            {sortedConversations.map((c: any) => (
                                <div
                                    key={c.id}
                                    onClick={() => {
                                        handleCurrentChatClick(c);
                                    }}
                                >
                                    <Conversation
                                        unreadCounts={unreadCounts[c.id]}
                                        currentChat={currentChat}
                                        conversation={c}
                                        currentUser={currentUser}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='sm:flex-5.5'>
                    {currentChat ? (
                        <div className='flex flex-col w-full justify-between relative p-3 sm:h-screen'>
                            <div className='h-screen overflow-y-scroll no-scrollbar pr-3'>
                                {messages.map((m: any) => (
                                    <div key={m.id} ref={scrollRef}>
                                        <Message message={m} own={m.sender !== currentUser?.userId} />
                                    </div>
                                ))}
                            </div>
                            <div className='flex w-full items-center'>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className='flex flex-col gap-4 w-full max-w-5xl'
                                    >
                                        <div className='flex gap-2 justify-center items-center'>
                                            {imageUrl && (
                                                <img
                                                    src={imageUrl}
                                                    alt={`image`}
                                                    style={{ objectFit: 'cover', width: '40px', height: '40px' }}
                                                />
                                            )}
                                            <div className='flex-grow'>
                                                <FormField
                                                    control={form.control}
                                                    name='text'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl className='relative'>
                                                                <Textarea
                                                                    className='w-full pr-10'
                                                                    placeholder='Write something...'
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <CldUploadWidget
                                                uploadPreset='xsocial_messages'
                                                options={{
                                                    multiple: false,
                                                    resourceType: 'image',
                                                }}
                                                onSuccess={onUploadSuccessHandler}
                                                onError={onUploadErrorHandler}
                                            >
                                                {({ open }) => (
                                                    <div className='flex flex-col items-center justify-center'>
                                                        <ImagePlus onClick={(event) => open()} />
                                                    </div>
                                                )}
                                            </CldUploadWidget>
                                        </div>
                                        <Button
                                            disabled={!imageUrl && !form.getValues().text ? true : false}
                                            className='px-4 py-2 rounded-md'
                                        >
                                            Send
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center h-full'>
                            <Image src={noMessagesBg} alt={'No Messages'} />
                        </div>
                    )}
                </div>
                <div className='sm:flex-2 border-l hidden sm:block'>
                    <div className='h-screen p-3'>
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={currentUser.userId}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default ChatPage;
