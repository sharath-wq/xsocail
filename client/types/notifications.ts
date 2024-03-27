export type INotification = {
    id: string;
    senderId: string;
    receiverId: string;
    type: string;
    content: string;
    postId: string;
    isRead: boolean;
    createdAt: Date;
    sender: {
        id: string;
        imageUrl: string;
        username: string;
    };
    post: {
        id: string;
        imageUrls: string[];
    };
};
