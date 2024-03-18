export interface IConversations {
    members: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface IConversationsUpdate {
    updatedAt: Date;
}

export interface IConversationsRes {
    id: string;
    members: string[];
    recentMessage?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
