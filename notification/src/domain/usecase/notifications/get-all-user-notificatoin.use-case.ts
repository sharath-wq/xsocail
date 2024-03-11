import { INotification } from '../../entities/notifications';
import { INotificationRepository } from '../../interface/repository/notification.repository';
import { IGetAllUserNotificationUseCase } from '../../interface/usecase/get-all-user-notificatoin.use-case';

export class GetAllUserNotifications implements IGetAllUserNotificationUseCase {
    notificationRepository: INotificationRepository;

    constructor(notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(userId: string): Promise<INotification[] | []> {
        return this.notificationRepository.getAllNotificationByUserId(userId);
    }
}
