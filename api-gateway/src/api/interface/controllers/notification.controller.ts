import { NextFunction, Request, Response } from 'express';

export interface INotificationController {
    getAllUserNotifications(req: Request, res: Response, next: NextFunction): Promise<void>;
    batchUpdate(req: Request, res: Response, next: NextFunction): Promise<void>;
}
