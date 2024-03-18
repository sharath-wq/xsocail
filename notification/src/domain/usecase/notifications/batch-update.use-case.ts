import { IUpdateNotification } from '../../entities/notifications';
import { INotificationRepository } from '../../interface/repository/notification.repository';
import { IBatchUpdateNotificationUseCase } from '../../interface/usecase/batch-update.use-case';

export class BatchUpdate implements IBatchUpdateNotificationUseCase {
    notificationRepository: INotificationRepository;

    constructor(notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async execute(ids: string[], notifcation: IUpdateNotification): Promise<void> {
        await this.notificationRepository.batchUpdate(ids, notifcation);
    }
}
