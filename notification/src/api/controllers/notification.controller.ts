import { Request, Response, NextFunction } from 'express';

import { INotificationController } from '../interface/notification.controller';
import { IGetAllUserNotificationUseCase } from '../../domain/interface/usecase/get-all-user-notificatoin.use-case';

export class NotificationController implements INotificationController {
    getAllUserNotificationUseCase: IGetAllUserNotificationUseCase;

    constructor(getAllUserNotificationUseCase: IGetAllUserNotificationUseCase) {
        this.getAllUserNotificationUseCase = getAllUserNotificationUseCase;
    }

    async getNotificationsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;
        try {
            const notifications = await this.getAllUserNotificationUseCase.execute(userId);
            res.send(notifications);
        } catch (error) {
            next(error);
        }
    }
}
