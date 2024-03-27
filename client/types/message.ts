export type CurrentChat = {
    members: string[];
    id: string;
    crearedAt: Date;
    updatedAt: Date;
};

export type IMessage = {
    id: string;
    conversationId: string;
    createdAt: Date;
    sender: string;
    text?: string;
    imageUrl?: string;
    updatedAt: Date;
};
