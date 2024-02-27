import { NextFunction, Request, Response } from 'express';

export interface CommentControllerInterface {
    createComment(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCommentsByPostId(req: Request, res: Response, next: NextFunction): Promise<void>;
    commentService(req: Request, res: Response, next: NextFunction): Promise<void>;
}
