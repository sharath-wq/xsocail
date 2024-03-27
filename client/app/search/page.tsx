'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { debounce } from '@/lib/utils';
import { UserData } from '@/types/user';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SearchPage = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [q, setQ] = useState<string>('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/api/users?q=${q}`);
                console.log(response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const debouncedFetchUsers = debounce(fetchUsers, 300);

        if (q.trim() !== '') {
            debouncedFetchUsers();
        } else {
            setUsers([]);
        }

        return () => {
            debouncedFetchUsers.cancel();
        };
    }, [q]);

    return (
        <div className='flex mt-20 flex-col gap-2 p-5'>
            <div className='flex w-full max-w-sm space-x-2'>
                <Input value={q} onChange={(e) => setQ(e.target.value)} type='email' placeholder='Search users' />
                <Button type='submit'>Search</Button>
            </div>

            {users.length > 0 ? (
                <ScrollArea className='max-h-72 w-1/3 rounded-md border overflow-y-auto'>
                    <div className='p-4'>
                        <h4 className='mb-4 text-sm font-medium leading-none'>Users</h4>
                        {users &&
                            users.map((user, _) => (
                                <>
                                    <div key={user.id} className='text-sm flex gap-4 items-center justify-between'>
                                        <div className='flex gap-4 flex-grow'>
                                            <Avatar>
                                                <AvatarImage src={user.imageUrl} alt='' />
                                                <AvatarFallback>{user.username.split('')[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className='flex flex-col'>
                                                <span className='text-lg'>{user.username}</span>
                                                <span className='text-base text-muted-foreground'>{user.fullName}</span>
                                            </div>
                                        </div>
                                        <Button asChild variant={'secondary'}>
                                            <Link href={`/user/${user.id}`}>View Profile</Link>
                                        </Button>
                                    </div>

                                    {_ !== users.length - 1 && <Separator className='my-2' />}
                                </>
                            ))}
                    </div>
                </ScrollArea>
            ) : (
                q && 'No Users found'
            )}
        </div>
    );
};

export default SearchPage;
