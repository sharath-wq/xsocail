import { INotificationReq, INotification, IUpdateNotification } from '../../../domain/entities/notifications';
import { INotificationDataSource } from '../../interface/data-source/notification.data-source';
import { Notification } from './schema/notification.schema';

export class NotificationDataSource implements INotificationDataSource {
    async batchUpdate(ids: string[], notifcation: IUpdateNotification): Promise<void> {
        try {
            await Notification.updateMany({ _id: { $in: ids } }, notifcation);
        } catch (error) {
            console.log(error);
        }
    }

    async updateNotification(id: string, notifcation: IUpdateNotification): Promise<INotification | null> {
        try {
            const result = await Notification.findByIdAndUpdate(id, {
                ...notifcation,
            });

            if (!result) {
                return null;
            }

            return {
                id: result.id,
                content: result.content,
                postId: result.postId,
                receiverId: result.receiverId,
                isRead: result.isRead,
                senderId: result.senderId,
                createdAt: result.createdAt,
                type: result.type,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getDuplicateNotificatioin(senderId: string, postId: string, type: string): Promise<INotification | null> {
        try {
            const result = await Notification.findOne({ senderId, postId, type });

            if (!result) {
                return null;
            }

            return {
                id: result.id,
                content: result.content,
                postId: result.postId,
                receiverId: result.receiverId,
                isRead: result.isRead,
                senderId: result.senderId,
                createdAt: result.createdAt,
                type: result.type,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createOne(notification: INotificationReq): Promise<INotification | null> {
        try {
            const result = await Notification.create(notification);

            if (!notification) {
                return null;
            }

            const { id, senderId, postId, receiverId, type, isRead, createdAt, content } = result;

            return {
                id,
                senderId,
                receiverId,
                type,
                content,
                isRead,
                createdAt,
                postId,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAllNotificationByUserId(userId: string): Promise<[] | INotification[]> {
        try {
            const results = await Notification.find({ receiverId: userId }).sort({ createdAt: -1 });

            return results.map((result) => {
                const { id, senderId, receiverId, type, postId, isRead, createdAt, content } = result;
                return {
                    id,
                    senderId,
                    receiverId,
                    type,
                    postId,
                    isRead,
                    createdAt,
                    content,
                };
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
