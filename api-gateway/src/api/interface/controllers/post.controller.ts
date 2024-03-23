import { NextFunction, Request, Response } from 'express';

export interface IPostController {
    postFeed(req: Request, res: Response, next: NextFunction): Promise<void>;
    postService(req: Request, res: Response, next: NextFunction): Promise<void>;
    getReportedPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
}
