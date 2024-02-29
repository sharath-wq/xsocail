import express, { NextFunction, Request, Response } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { GetUserUseCase } from '../../domain/interface/use-cases';
import { requireAuth } from '@scxsocialcommon/errors';

export default function CommentRouter(getUserUseCase: GetUserUseCase) {
    const router = express.Router();
    const commentController = new CommentController(getUserUseCase);

    router.post('/:postId', async (req: Request, res: Response, next: NextFunction) => {
        commentController.createComment(req, res, next);
    });

    router.get('/:postId', async (req: Request, res: Response, next: NextFunction) => {
        commentController.getCommentsByPostId(req, res, next);
    });

    router.put('/like/:commentId', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
        commentController.likeComment(req, res, next);
    });

    router.put('/dislike/:commentId', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
        commentController.dislikeComment(req, res, next);
    });

    return router;
}
