import { INotificationDataSource } from '../../data/interface/data-source/notification.data-source';
import { INotificationReq, INotification } from '../entities/notifications';
import { INotificationRepository } from '../interface/repository/notification.repository';

export class NotificationRepository implements INotificationRepository {
    notificationDataSource: INotificationDataSource;

    constructor(notificationDataSource: INotificationDataSource) {
        this.notificationDataSource = notificationDataSource;
    }

    async createOne(notification: INotificationReq): Promise<INotification | null> {
        return this.notificationDataSource.createOne(notification);
    }

    async getAllNotificationByUserId(userId: string): Promise<[] | INotification[]> {
        return this.notificationDataSource.getAllNotificationByUserId(userId);
    }
}
