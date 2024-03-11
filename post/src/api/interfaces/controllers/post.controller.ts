import { NextFunction, Request, Response } from 'express';

export interface PostControllerInterface {
    createPost(req: Request, res: Response, next: NextFunction): Promise<void>;
    updatePost(req: Request, res: Response, next: NextFunction): Promise<void>;
    deletePost(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllPosts(req: Request, res: Response): Promise<void>;
    getOnePost(req: Request, res: Response): Promise<void>;
    getUserPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
    likePost(req: Request, res: Response, next: NextFunction): Promise<void>;
    disLikePost(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserFeed(req: Request, res: Response, next: NextFunction): Promise<void>;
    getSavedPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBatchPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
}
