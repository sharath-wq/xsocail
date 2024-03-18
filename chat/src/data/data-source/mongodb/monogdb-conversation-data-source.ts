import { IConversations, IConversationsRes, IConversationsUpdate } from '../../../domain/entities/conversations';
import { IConversationDataSource } from '../../interface/data-source/conversation-data-source';
import { Conversation } from './Schema/conversation.schema';

export class MongoDBConversationDataSource implements IConversationDataSource {
    async update(cid: string, data: IConversationsUpdate): Promise<IConversationsRes | null> {
        try {
            const result = await Conversation.findByIdAndUpdate(cid, data);

            if (!result) {
                return null;
            }

            const { id, members, createdAt, updatedAt, recentMessage } = result;

            return {
                id,
                members,
                createdAt,
                updatedAt,
                recentMessage,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async create(senderId: string, receiverId: string): Promise<IConversationsRes | null> {
        try {
            const result = await Conversation.create({
                members: [senderId, receiverId],
            });

            if (!result) {
                return null;
            }

            const { id, members, createdAt, updatedAt, recentMessage } = result;

            return {
                id,
                members,
                createdAt,
                recentMessage,
                updatedAt,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getConversationByUserId(userId: string): Promise<IConversationsRes[] | []> {
        try {
            const result = await Conversation.find({
                members: {
                    $in: [userId],
                },
            }).sort({ updatedAt: -1 });

            return result.map(({ id, members, createdAt, updatedAt, recentMessage }) => ({
                id,
                members,
                createdAt,
                updatedAt,
                recentMessage,
            }));
        } catch (error) {
            console.log(error);
            return [];
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

            const { id, members, createdAt, updatedAt, recentMessage } = result;

            return {
                id,
                members,
                createdAt,
                recentMessage,
                updatedAt,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
