import { NextFunction, Request, Response } from 'express';

export interface UserControllerInterface {
    createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    Login(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUserProfileImage(req: Request, res: Response, next: NextFunction): Promise<void>;
}
