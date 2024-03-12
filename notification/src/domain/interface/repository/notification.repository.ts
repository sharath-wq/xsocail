import { INotification, INotificationReq, IUpdateNotification } from '../../entities/notifications';

export interface INotificationRepository {
    createOne(notification: INotificationReq): Promise<INotification | null>;
    getAllNotificationByUserId(userId: string): Promise<INotification[] | []>;
    getDuplicateNotificatioin(senderId: string, postId: string, type: string): Promise<INotification | null>;
    updateNotification(id: string, notifcation: IUpdateNotification): Promise<INotification | null>;
}
