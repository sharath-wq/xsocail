import { IConversations, IConversationsRes } from '../../../domain/entities/conversations';
import { IConversationDataSource } from '../../interface/data-source/conversation-data-source';
import { Conversation } from './Schema/conversation.schema';

export class MongoDBConversationDataSource implements IConversationDataSource {
    async create(senderId: string, receiverId: string): Promise<IConversationsRes | null> {
        try {
            const result = await Conversation.create({
                members: [senderId, receiverId],
            });

            if (!result) {
                return null;
            }

            const { id, members, createdAt, updatedAt } = result;

            return {
                id,
                members,
                createdAt,
                updatedAt,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getConversationByUserId(userId: string): Promise<IConversationsRes | null> {
        try {
            const result = await Conversation.findOne({
                members: {
                    $in: [userId],
                },
            });

            if (!result) {
                return null;
            }

            const { id, members, createdAt, updatedAt } = result;

            return {
                id,
                members,
                createdAt,
                updatedAt,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getConversationByBothIds(firstId: string, secondId: string): Promise<IConversationsRes | null> {
        try {
            const result = await Conversation.findOne({
                members: {
                    $all: [firstId, secondId],
                },
            });

            if (!result) {
                return null;
            }

            const { id, members, createdAt, updatedAt } = result;

            return {
                id,
                members,
                createdAt,
                updatedAt,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
