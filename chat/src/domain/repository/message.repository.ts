import { IMessageDataSource } from '../../data/interface/data-source/message-data-source';
import { IMessageReq, IMessage } from '../entities/message';
import { IMessageRepository } from '../interface/repository/message.repository';

export class MessageRepository implements IMessageRepository {
    messageDataSource: IMessageDataSource;

    constructor(messageDataSource: IMessageDataSource) {
        this.messageDataSource = messageDataSource;
    }

    async markAsRead(cId: string, userId: string): Promise<void> {
        await this.messageDataSource.markMessageAsRead(cId, userId);
    }

    async getLastMessage(cId: string): Promise<IMessage | null> {
        return await this.messageDataSource.getRecentMessage(cId);
    }

    async create(message: IMessageReq): Promise<IMessage | null> {
        return await this.messageDataSource.create(message);
    }

    async findAllMessageByConversationId(conversationId: string): Promise<[] | IMessage[]> {
        return await this.messageDataSource.findAllMessagesByConversationId(conversationId);
    }
}
