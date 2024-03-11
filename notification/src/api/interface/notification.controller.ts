import { NextFunction, Request, Response } from 'express';

export interface INotificationController {
    getNotificationsByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
}
