export interface IMessageReq {
    conversationId: string;
    sender: string;
    text: string;
}

export interface IMessage {
    id: string;
    conversationId: string;
    sender: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}
