'use client';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EditProfileValiation } from '@/lib/validation';
import { Textarea } from '@/components/ui/textarea';
import useRequest from '@/hooks/useRequest';
import { useState } from 'react';
import { toast } from '../ui/use-toast';
import { useUser } from '@/context/userContext';
import { ButtonLoading } from '../button/LoadingButton';

type EditProfilePorps = {
    email: string;
    username: string;
    bio: string;
    fullName: string;
};

const EditProfile = ({ username, bio, fullName, email }: EditProfilePorps) => {
    const [isSubmiting, setIsSubmiting] = useState(false);

    const { currentUser, getCurrentUser } = useUser();

    // 1. Define your form.
    const form = useForm<z.infer<typeof EditProfileValiation>>({
        resolver: zodResolver(EditProfileValiation),
        defaultValues: {
            email: email,
            username: username,
            bio: bio,
            fullName: fullName,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof EditProfileValiation>) {
        setIsSubmiting(true);
        doRequest(values);
    }

    const { doRequest, errors } = useRequest({
        url: `/api/users/${currentUser?.userId}`,
        method: 'patch',
        body: {},
        onSuccess: () => {
            setIsSubmiting(false);
            toast({
                description: 'Profile Updated',
            });
            getCurrentUser();
        },
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='secondary'>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    {errors}
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled placeholder='Email' type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='fullName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Full Name' type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Username' type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='bio'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='A little bit about yourself'
                                            className='resize-none'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            {isSubmiting ? <ButtonLoading /> : <Button type='submit'>Save changes</Button>}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfile;
