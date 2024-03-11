import express, { NextFunction, Request, Response } from 'express';

import { IGetAllUserNotificationUseCase } from '../../domain/interface/usecase/get-all-user-notificatoin.use-case';
import { NotificationController } from '../controllers/notification.controller';

export default function NotificationRouter(getAllUserNotificationUseCase: IGetAllUserNotificationUseCase) {
    const router = express.Router();

    const notificationController = new NotificationController(getAllUserNotificationUseCase);

    router.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
        notificationController.getNotificationsByUserId(req, res, next);
    });

    return router;
}
