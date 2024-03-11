import { INotification, INotificationReq } from '../../entities/notifications';

export interface ICreateNotificationUseCase {
    execute(notifcation: INotificationReq): Promise<INotification | null>;
}
