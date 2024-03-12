import express, { NextFunction, Request, Response } from 'express';
import { NotificationController } from '../controllers/notification.controller';

export default function NotificationRouter() {
    const router = express.Router();
    const notificationController = new NotificationController();

    router.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
        notificationController.getAllUserNotifications(req, res, next);
    });

    router.patch('/batch/update', async (req: Request, res: Response, next: NextFunction) => {
        notificationController.batchUpdate(req, res, next);
    });

    return router;
}
