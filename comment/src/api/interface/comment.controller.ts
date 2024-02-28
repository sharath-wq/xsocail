import { NextFunction, Request, Response } from 'express';

export interface ICommentController {
    createComment(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteComment(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCommentsByPostId(req: Request, res: Response, next: NextFunction): Promise<void>;
    likeComment(req: Request, res: Response, next: NextFunction): Promise<void>;
    disLikeComment(req: Request, res: Response, next: NextFunction): Promise<void>;
}
