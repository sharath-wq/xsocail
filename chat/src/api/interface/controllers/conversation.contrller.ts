import { NextFunction, Request, Response } from 'express';

export interface IconversationController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    getConversationByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
    getConversationByBothIds(req: Request, res: Response, next: NextFunction): Promise<void>;
}
