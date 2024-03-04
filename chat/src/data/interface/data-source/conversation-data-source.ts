import { IConversations, IConversationsRes } from '../../../domain/entities/conversations';

export interface IConversationDataSource {
    create(senderId: string, receiverId: string): Promise<IConversationsRes | null>;
    getConversationByUserId(userId: string): Promise<IConversationsRes | null>;
    getConversationByBothIds(firstId: string, secondId: string): Promise<IConversationsRes | null>;
}
