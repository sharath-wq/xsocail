export interface IConversations {
    members: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface IConversationsUpdate {
    updatedAt?: Date;
    unreadCount?: number;
}

export interface IConversationsRes {
    id: string;
    members: string[];
    recentMessage?: string | null;
    unreadCount?: number;
    createdAt: Date;
    updatedAt: Date;
}
