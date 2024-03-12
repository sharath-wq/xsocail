import { INotification, INotificationReq, IUpdateNotification } from '../../entities/notifications';

export interface IBatchUpdateNotificationUseCase {
    execute(ids: string[], notifcation: IUpdateNotification): Promise<void>;
}
