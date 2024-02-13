'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface UserContextType {
    currentUser: any;
}

const UserContext = createContext<UserContextType>({ currentUser: null });

export const useUser = (): UserContextType => {
    return useContext(UserContext);
};

export const UserProvider: React.FC = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/api/users/currentuser');
                setCurrentUser(data.currentUser);
            } catch (e) {
                const error = e as AxiosError;
                setCurrentUser(null);
            }
        })();
    }, []);

    const userContextValue: UserContextType = {
        currentUser,
    };

    return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};
