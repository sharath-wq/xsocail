import { INotification } from '../../entities/notifications';

export interface IGetAllUserNotificationUseCase {
    execute(userId: string): Promise<INotification[] | []>;
}
