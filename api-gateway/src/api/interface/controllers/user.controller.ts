import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../../domain/entities/user';

export interface UserControllerInterface {
    getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    userService(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
    createUser(data: UserModel): Promise<UserModel | null>;
    updateUser(userId: string, data: UserModel): Promise<UserModel | null>;
    blockUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    unblockUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    savePost(req: Request, res: Response, next: NextFunction): Promise<void>;
    unsavePost(req: Request, res: Response, next: NextFunction): Promise<void>;
    getSavedPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
    follow(req: Request, res: Response, next: NextFunction): Promise<void>;
    unfollow(req: Request, res: Response, next: NextFunction): Promise<void>;
    getReportedUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
}
