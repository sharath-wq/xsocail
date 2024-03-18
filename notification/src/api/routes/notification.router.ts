import express, { NextFunction, Request, Response } from 'express';

import { IGetAllUserNotificationUseCase } from '../../domain/interface/usecase/get-all-user-notificatoin.use-case';
import { NotificationController } from '../controllers/notification.controller';
import { IBatchUpdateNotificationUseCase } from '../../domain/interface/usecase/batch-update.use-case';

export default function NotificationRouter(
    getAllUserNotificationUseCase: IGetAllUserNotificationUseCase,
    batchUpdateNotificationUseCase: IBatchUpdateNotificationUseCase
) {
    const router = express.Router();

    const notificationController = new NotificationController(
        getAllUserNotificationUseCase,
        batchUpdateNotificationUseCase
    );

    router.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
        notificationController.getNotificationsByUserId(req, res, next);
    });

    router.patch('/batch/update', async (req: Request, res: Response, next: NextFunction) => {
        notificationController.batchUpdate(req, res, next);
    });

    return router;
}
