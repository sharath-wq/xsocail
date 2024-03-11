export interface INotification {
    id: string;
    senderId: string;
    receiverId: string;
    type: string;
    postId: string;
    isRead: boolean;
    createdAt: Date;
}
