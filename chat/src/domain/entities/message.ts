export interface IMessageReq {
    conversationId: string;
    sender: string;
    text?: string;
    imageUrl?: string;
}

export interface IMessage {
    id: string;
    conversationId: string;
    sender: string;
    text?: string | null;
    imageUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
    isRead: boolean;
}
