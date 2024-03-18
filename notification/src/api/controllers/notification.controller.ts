import { Request, Response, NextFunction } from 'express';

import { INotificationController } from '../interface/notification.controller';
import { IGetAllUserNotificationUseCase } from '../../domain/interface/usecase/get-all-user-notificatoin.use-case';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { IBatchUpdateNotificationUseCase } from '../../domain/interface/usecase/batch-update.use-case';

export class NotificationController implements INotificationController {
    getAllUserNotificationUseCase: IGetAllUserNotificationUseCase;
    batchUpdateNotificationUseCase: IBatchUpdateNotificationUseCase;

    constructor(
        getAllUserNotificationUseCase: IGetAllUserNotificationUseCase,
        batchUpdateNotificationUseCase: IBatchUpdateNotificationUseCase
    ) {
        this.getAllUserNotificationUseCase = getAllUserNotificationUseCase;
        this.batchUpdateNotificationUseCase = batchUpdateNotificationUseCase;
    }

    async batchUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { ids } = req.body;
        try {
            await this.batchUpdateNotificationUseCase.execute(ids, { isRead: true });
            res.send({ status: 'ok' });
        } catch (error) {
            next(error);
        }
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
