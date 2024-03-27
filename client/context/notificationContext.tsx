import React, { createContext, useContext, useEffect, useState, SetStateAction, Dispatch } from 'react';
import axios, { AxiosError } from 'axios';
import { INotification } from '@/types/notifications';
import { useUser } from './userContext';

interface NotificationsContextType {
    newNotifications: INotification[];
    oldNotifications: INotification[];
    count: number;
    getNotifications: () => Promise<void>;
    markNotificationsAsRead: () => Promise<void>;
    setNewNotifications: Dispatch<SetStateAction<INotification[]>>;
    setCount: Dispatch<SetStateAction<number>>;
}

const NotificationsContext = createContext<NotificationsContextType>({
    newNotifications: [],
    oldNotifications: [],
    count: 0,
    getNotifications: async () => {},
    markNotificationsAsRead: async () => {},
    setNewNotifications: () => {},
    setCount: () => {},
});

export const useNotifications = (): NotificationsContextType => {
    return useContext(NotificationsContext);
};

export const NotificationsProvider: React.FC = ({ children }: any) => {
    const [newNotifications, setNewNotifications] = useState<INotification[]>([]);
    const [oldNotifications, setOldNotifications] = useState<INotification[]>([]);
    const [count, setCount] = useState<number>(0);

    const { currentUser } = useUser();

    const getNotifications = async () => {
        try {
            // Fetch notifications data from your API
            const { data } = await axios.get(`/api/notifications/${currentUser && currentUser.userId}`);
            setCount(data.newNotifications.length);
            setNewNotifications(data.newNotifications);
            setOldNotifications(data.oldNotifications);
        } catch (error) {
            console.log(error);
        }
    };

    const markNotificationsAsRead = async () => {
        try {
            // Mark notifications as read on the server
            const notificationsIds = newNotifications.map((n) => n.id);
            setCount(0);
            await axios.patch(`/api/notifications/batch/update`, {
                ids: notificationsIds,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const notificationsContextValue: NotificationsContextType = {
        newNotifications,
        oldNotifications,
        count,
        getNotifications,
        markNotificationsAsRead,
        setNewNotifications,
        setCount,
    };

    return <NotificationsContext.Provider value={notificationsContextValue}>{children}</NotificationsContext.Provider>;
};
