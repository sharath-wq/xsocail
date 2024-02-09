import * as React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export function Suggetions() {
    return (
        <div>
            <ScrollArea className='h-96 w-96 rounded-md border'>
                <div className='p-4'>
                    <h4 className='mb-4 text-2xl font-bold leading-none'>People you may know</h4>
                    {tags.map((tag) => (
                        <>
                            <div key={tag} className='flex gap-4'>
                                <Avatar>
                                    <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <span className='text-base'>Sharath-wq</span>
                                    <span className='text-xs'>sharath chandran p</span>
                                </div>
                                <Button className='ml-auto' variant={'outline'}>
                                    follow
                                </Button>
                            </div>
                            <Separator className='my-2' />
                        </>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
