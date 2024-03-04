import { NextFunction, Request, Response } from 'express';

export interface IMessageController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllMessagesByConversationId(req: Request, res: Response, next: NextFunction): Promise<void>;
}
