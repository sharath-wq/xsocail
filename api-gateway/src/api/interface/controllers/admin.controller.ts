import { NextFunction, Request, Response } from 'express';

export interface IAdminController {
    dashboard(req: Request, res: Response, next: NextFunction): Promise<void>;
}
