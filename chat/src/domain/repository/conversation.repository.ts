import { IConversationDataSource } from '../../data/interface/data-source/conversation-data-source';
import { IConversations, IConversationsRes, IConversationsUpdate } from '../entities/conversations';
import { IConversationRepository } from '../interface/repository/conversation.repository';

export class ConversationReposity implements IConversationRepository {
    conversationDataSource: IConversationDataSource;

    constructor(conversationDataSource: IConversationDataSource) {
        this.conversationDataSource = conversationDataSource;
    }

    async update(cid: string, data: IConversationsUpdate): Promise<IConversationsRes | null> {
        return await this.conversationDataSource.update(cid, data);
    }

    async create(senderId: string, receiverId: string): Promise<IConversations | null> {
        const result = await this.conversationDataSource.create(senderId, receiverId);
        return result;
    }

    async getConversationByUserId(userId: string): Promise<IConversationsRes[] | []> {
        const result = await this.conversationDataSource.getConversationByUserId(userId);
        return result;
    }

    async getConversationByBothIds(firstId: string, secondId: string): Promise<IConversationsRes | null> {
        const result = await this.conversationDataSource.getConversationByBothIds(firstId, secondId);
        return result;
    }
}
