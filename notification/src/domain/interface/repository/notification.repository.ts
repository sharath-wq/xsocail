import { INotification, INotificationReq } from '../../entities/notifications';

export interface INotificationRepository {
    createOne(notification: INotificationReq): Promise<INotification | null>;
    getAllNotificationByUserId(userId: string): Promise<INotification[] | []>;
}
