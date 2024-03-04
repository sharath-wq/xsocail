import { NextFunction, Request, Response } from 'express';

export interface IChatController {
    chatService(req: Request, res: Response, next: NextFunction): Promise<void>;
}
