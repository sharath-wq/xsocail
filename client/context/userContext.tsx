'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface UserContextType {
    currentUser: any;
    getCurrentUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
    currentUser: null,
    getCurrentUser: async () => {},
});

export const useUser = (): UserContextType => {
    return useContext(UserContext);
};

export const UserProvider: React.FC = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<any>(null);

    const getCurrentUser = async () => {
        try {
            const { data } = await axios.get('/api/users/currentuser');
            setCurrentUser(data.currentUser);
        } catch (e) {
            const error = e as AxiosError;
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                await getCurrentUser();
            } catch (e) {
                const error = e as AxiosError;
                setCurrentUser(null);
            }
        })();
    }, []);

    const userContextValue: UserContextType = {
        currentUser,
        getCurrentUser,
    };

    return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};
