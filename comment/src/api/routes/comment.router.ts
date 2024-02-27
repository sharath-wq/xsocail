import express, { NextFunction, Request, Response } from 'express';
import { ICommentDeleteUseCase, ICreateCommentUseCase, IGetByPostIdUseCase } from '../../domain/interface/use-case';
import { CommentController } from '../controllers/comment.controller';

export default function CommentRouter(
    createCommentUseCase: ICreateCommentUseCase,
    deleteCommentUseCase: ICommentDeleteUseCase,
    getByPostIdUseCase: IGetByPostIdUseCase
) {
    const rotuer = express.Router();
    const commentController = new CommentController(createCommentUseCase, deleteCommentUseCase, getByPostIdUseCase);

    rotuer.post('/', async (req: Request, res: Response, next: NextFunction) => {
        commentController.createComment(req, res, next);
    });

    rotuer.delete('/:commentId', async (req: Request, res: Response, next: NextFunction) => {
        commentController.deleteComment(req, res, next);
    });

    rotuer.get('/:postId', async (req: Request, res: Response, next: NextFunction) => {
        commentController.getCommentsByPostId(req, res, next);
    });

    return rotuer;
}
