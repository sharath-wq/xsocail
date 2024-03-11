import { INotificationReq, INotification } from '../../entities/notifications';
import { INotificationRepository } from '../../interface/repository/notification.repository';
import { ICreateNotificationUseCase } from '../../interface/usecase/create-notification.use-case';

export class CreateNotifications implements ICreateNotificationUseCase {
    notificationRepository: INotificationRepository;

    constructor(notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(notifcation: INotificationReq): Promise<INotification | null> {
        return this.notificationRepository.createOne(notifcation);
    }
}
