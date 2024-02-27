import { ICommentController } from '../interface/comment.controller';
import { ICreateCommentUseCase, ICommentDeleteUseCase, IGetByPostIdUseCase } from '../../domain/interface/use-case';
import { Request, Response, NextFunction } from 'express';

export class CommentController implements ICommentController {
    createCommentUseCase: ICreateCommentUseCase;
    deleteCommentUseCase: ICommentDeleteUseCase;
    getByPostIdUseCase: IGetByPostIdUseCase;

    constructor(
        createCommentUseCase: ICreateCommentUseCase,
        deleteCommentUseCase: ICommentDeleteUseCase,
        getByPostIdUseCase: IGetByPostIdUseCase
    ) {
        this.createCommentUseCase = createCommentUseCase;
        this.deleteCommentUseCase = deleteCommentUseCase;
        this.getByPostIdUseCase = getByPostIdUseCase;
    }

    async createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const comment = await this.createCommentUseCase.execute(req.body);
            res.send(comment);
        } catch (error) {
            next(error);
        }
    }

    async deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { commentId } = req.params;
        try {
            await this.deleteCommentUseCase.execute(commentId);
            res.send({ status: 'ok' });
        } catch (error) {
            next(error);
        }
    }

    async getCommentsByPostId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { postId } = req.params;
        try {
            const comments = await this.getByPostIdUseCase.execute(postId);
            res.send(comments);
        } catch (error) {
            next(error);
        }
    }
}
