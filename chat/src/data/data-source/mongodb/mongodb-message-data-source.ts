import { IMessageReq, IMessage } from '../../../domain/entities/message';
import { IMessageDataSource } from '../../interface/data-source/message-data-source';
import { Message } from './Schema/message.schema';

export class MongoDBMessageDataSource implements IMessageDataSource {
    async markMessageAsRead(cId: string, userId: string): Promise<void> {
        try {
            await Message.updateMany(
                { conversationId: cId, sender: { $ne: userId } },
                {
                    isRead: true,
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getRecentMessage(cId: string): Promise<IMessage | null> {
        try {
            const result = await Message.findOne({ conversationId: cId }).sort({ _id: -1 }).limit(1);

            if (!result) {
                return null;
            }

            const { id, conversationId, sender, text, createdAt, updatedAt, imageUrl, isRead } = result;

            return {
                id,
                isRead,
                conversationId,
                sender,
                text,
                imageUrl,
                createdAt,
                updatedAt,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async create(message: IMessageReq): Promise<IMessage | null> {
        try {
            const result = await Message.create(message);

            if (!result) {
                return null;
            }

            const { id, conversationId, sender, text, createdAt, updatedAt, imageUrl, isRead } = result;

            return {
                id,
                conversationId,
                sender,
                text,
                isRead,
                createdAt,
                updatedAt,
                imageUrl,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async findAllMessagesByConversationId(conversationId: string): Promise<[] | IMessage[]> {
        try {
            const result = await Message.find({
                conversationId,
            });

            return result.map(({ id, conversationId, sender, createdAt, text, updatedAt, imageUrl, isRead }) => ({
                id,
                conversationId,
                createdAt,
                sender,
                isRead,
                text,
                updatedAt,
                imageUrl,
            }));
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
