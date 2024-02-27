import express, { NextFunction, Request, Response } from 'express';
import { PostController } from '../controllers/post.controller';
import { CommentController } from '../controllers/comment.controller';
import { GetUserUseCase } from '../../domain/interface/use-cases';

export default function CommentRouter(getUserUseCase: GetUserUseCase) {
    const router = express.Router();
    const commentController = new CommentController(getUserUseCase);

    router.post('/:postId', async (req: Request, res: Response, next: NextFunction) => {
        commentController.createComment(req, res, next);
    });

    router.get('/:postId', async (req: Request, res: Response, next: NextFunction) => {
        commentController.getCommentsByPostId(req, res, next);
    });

    return router;
}
