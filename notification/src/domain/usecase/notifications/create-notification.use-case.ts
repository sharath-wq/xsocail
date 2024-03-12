import { INotificationReq, INotification } from '../../entities/notifications';
import { INotificationRepository } from '../../interface/repository/notification.repository';
import { ICreateNotificationUseCase } from '../../interface/usecase/create-notification.use-case';

export class CreateNotifications implements ICreateNotificationUseCase {
    notificationRepository: INotificationRepository;

    constructor(notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(notifcation: INotificationReq): Promise<INotification | null> {
        if (notifcation.type === 'Like') {
            const existingNotification = await this.notificationRepository.getDuplicateNotificatioin(
                notifcation.senderId,
                notifcation.postId,
                notifcation.type
            );

            if (!existingNotification) {
                return await this.notificationRepository.createOne(notifcation);
            }

            const newUpdtedNotification = {
                ...existingNotification,
                isRead: false,
                createdAt: new Date(),
            };

            const updatedNotification = await this.notificationRepository.updateNotification(
                existingNotification.id,
                newUpdtedNotification
            );

            return updatedNotification;
        }

        return this.notificationRepository.createOne(notifcation);
    }
}
