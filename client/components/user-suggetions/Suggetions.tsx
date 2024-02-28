import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import axios, { AxiosError } from 'axios';
import { UserData } from '@/types/user';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/userContext';
import SingleSuggesteduser from './SingleSuggestedUser/SingleSuggesteduser';

export function Suggetions() {
    const [suggestedUsers, setSuggestedusers] = useState<UserData[]>();

    const getSuggestedUsers = async () => {
        try {
            // change this and inmpliment custom user suggetion algo
            const { data } = await axios.get(`/api/users`);
            setSuggestedusers(data);
        } catch (e) {
            const error = e as AxiosError;
        }
    };

    const { currentUser, getCurrentUser } = useUser();

    useEffect(() => {
        getSuggestedUsers();
        getCurrentUser();
    }, []);

    return (
        suggestedUsers &&
        suggestedUsers.length > 1 && (
            <div>
                <ScrollArea className='w-96 rounded-md border max-h-96 overflow-y-auto'>
                    <div className='p-4'>
                        <h4 className='mb-4 text-2xl font-bold leading-none'>People you may know</h4>
                        {suggestedUsers.map(
                            (user, idx) =>
                                // Change this when changing the suggested user route
                                user.id !== currentUser!.userId && (
                                    <div key={user.id}>
                                        <SingleSuggesteduser {...user} />
                                        {idx < suggestedUsers.length - 1 && <Separator className='my-2' />}
                                    </div>
                                )
                        )}
                    </div>
                </ScrollArea>
            </div>
        )
    );
}
