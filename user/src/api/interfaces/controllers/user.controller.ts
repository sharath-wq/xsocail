import { NextFunction, Request, Response } from 'express';

export interface UserControllerInterface {
    createUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
    updateUser(req: Request, res: Response): Promise<void>;
    getAllUser(req: Request, res: Response): Promise<void>;
    getUser(req: Request, res: Response): Promise<void>;
    Login(req: Request, res: Response): Promise<void>;
    Logout(req: Request, res: Response): Promise<void>;
    currentUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
