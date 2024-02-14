import { NextFunction, Request, Response } from 'express';

export interface IPostController {
    postService(req: Request, res: Response, next: NextFunction): Promise<void>;
}
