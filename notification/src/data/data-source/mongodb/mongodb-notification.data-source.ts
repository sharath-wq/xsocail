import { INotificationReq, INotification } from '../../../domain/entities/notifications';
import { INotificationDataSource } from '../../interface/data-source/notification.data-source';
import { Notification } from './schema/notification.schema';

export class NotificationDataSource implements INotificationDataSource {
    async createOne(notification: INotificationReq): Promise<INotification | null> {
        try {
            const result = await Notification.create(notification);

            if (!notification) {
                return null;
            }

            const { id, senderId, postId, receiverId, type, isRead, createdAt } = result;

            return {
                id,
                senderId,
                receiverId,
                type,
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
            const results = await Notification.find({ receiverId: userId });

            return results.map((result) => {
                const { id, senderId, receiverId, type, postId, isRead, createdAt } = result;
                return {
                    id,
                    senderId,
                    receiverId,
                    type,
                    postId,
                    isRead,
                    createdAt,
                };
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
