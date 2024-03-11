import { INotification, INotificationReq } from '../../../domain/entities/notifications';

export interface INotificationDataSource {
    createOne(notification: INotificationReq): Promise<INotification | null>;
    getAllNotificationByUserId(userId: string): Promise<INotification[] | []>;
}
