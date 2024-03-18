export interface INotificationReq {
    senderId: string;
    receiverId: string;
    type: string;
    content: string;
    postId?: string;
}

export interface INotification {
    id: string;
    senderId: string;
    receiverId: string;
    type: string;
    content: string;
    postId?: string;
    isRead: boolean;
    createdAt: Date;
}

export interface IUpdateNotification {
    isRead?: boolean;
    createdAt?: Date;
}
