import { IConversations, IConversationsRes, IConversationsUpdate } from '../../entities/conversations';

export interface IConversationRepository {
    create(senderId: string, receiverId: string): Promise<IConversations | null>;
    getConversationByUserId(userId: string): Promise<IConversationsRes[] | []>;
    getConversationByBothIds(firstId: string, secondId: string): Promise<IConversationsRes | null>;
    update(cid: string, data: IConversationsUpdate): Promise<IConversationsRes | null>;
}
