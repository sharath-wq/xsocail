import { NextFunction, Request, Response } from 'express';

export interface UserControllerInterface {
    getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    userService(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
}
