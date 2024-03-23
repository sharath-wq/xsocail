import { ICommentController } from '../interface/comment.controller';
import {
    ICreateCommentUseCase,
    ICommentDeleteUseCase,
    IGetByPostIdUseCase,
    ILikeCommentUseCase,
    IDislikeCommentUseCase,
} from '../../domain/interface/use-case';
import { Request, Response, NextFunction } from 'express';
import { NotificationCreatedPublisher } from '../events/pub/notification-created-publisher';
import { natsWrapper } from '../../../nats-wrapper';
import { CommentCreatedPublisher } from '../events/pub/comment-created-publisher';

export class CommentController implements ICommentController {
    createCommentUseCase: ICreateCommentUseCase;
    deleteCommentUseCase: ICommentDeleteUseCase;
    getByPostIdUseCase: IGetByPostIdUseCase;
    likeCommentUseCase: ILikeCommentUseCase;
    dislikeCommentUseCase: IDislikeCommentUseCase;

    constructor(
        createCommentUseCase: ICreateCommentUseCase,
        deleteCommentUseCase: ICommentDeleteUseCase,
        getByPostIdUseCase: IGetByPostIdUseCase,
        likeCommentUseCase: ILikeCommentUseCase,
        dislikeCommentUseCase: IDislikeCommentUseCase
    ) {
        this.createCommentUseCase = createCommentUseCase;
        this.deleteCommentUseCase = deleteCommentUseCase;
        this.getByPostIdUseCase = getByPostIdUseCase;
        this.likeCommentUseCase = likeCommentUseCase;
        this.dislikeCommentUseCase = dislikeCommentUseCase;
    }

    async likeComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { commentId } = req.params;
        const { userId } = req.body;
        try {
            await this.likeCommentUseCase.execute(commentId, userId);
            res.send({ status: 'ok' });
        } catch (error) {
            next(error);
        }
    }

    async disLikeComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { commentId } = req.params;
        const { userId } = req.body;
        try {
            await this.dislikeCommentUseCase.execute(commentId, userId);
            res.send({ status: 'ok' });
        } catch (error) {
            next(error);
        }
    }

    async createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { postAuthorId } = req.body;
        try {
            const comment = await this.createCommentUseCase.execute(req.body);

            if (comment) {
                await new NotificationCreatedPublisher(natsWrapper.client).publish({
                    postId: comment.postId,
                    senderId: comment.author.userId,
                    receiverId: postAuthorId,
                    type: 'Comment',
                    content: `Commented: ${comment.content}`,
                });

                await new CommentCreatedPublisher(natsWrapper.client).publish({
                    commentId: comment.id,
                    postId: comment.postId,
                });
            }

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
