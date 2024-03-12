import { INotificationDataSource } from '../../data/interface/data-source/notification.data-source';
import { INotificationReq, INotification, IUpdateNotification } from '../entities/notifications';
import { INotificationRepository } from '../interface/repository/notification.repository';

export class NotificationRepository implements INotificationRepository {
    notificationDataSource: INotificationDataSource;

    constructor(notificationDataSource: INotificationDataSource) {
        this.notificationDataSource = notificationDataSource;
    }

    async getDuplicateNotificatioin(senderId: string, postId: string, type: string): Promise<INotification | null> {
        return this.notificationDataSource.getDuplicateNotificatioin(senderId, postId, type);
    }

    async updateNotification(id: string, notifcation: IUpdateNotification): Promise<INotification | null> {
        return this.notificationDataSource.updateNotification(id, notifcation);
    }

    async createOne(notification: INotificationReq): Promise<INotification | null> {
        return this.notificationDataSource.createOne(notification);
    }

    async getAllNotificationByUserId(userId: string): Promise<[] | INotification[]> {
        return this.notificationDataSource.getAllNotificationByUserId(userId);
    }
}
