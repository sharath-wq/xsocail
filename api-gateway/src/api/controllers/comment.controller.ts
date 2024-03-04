import { Request, Response, NextFunction } from 'express';
import { CommentControllerInterface } from '../interface/controllers/comment.controller';
import { GetUserUseCase } from '../../domain/interface/use-cases';
import axios from 'axios';
import { COMMENT_SERVICE_ENDPOINT } from '../../constants/endpoints';
import { NotFoundError } from '@scxsocialcommon/errors';

export class CommentController implements CommentControllerInterface {
    getUserUseCase: GetUserUseCase;

    constructor(getUserUseCase: GetUserUseCase) {
        this.getUserUseCase = getUserUseCase;
    }

    async likeComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;
        const path = req.originalUrl.replace('/api/comments', '');

        try {
            const response = await axios.put(`${COMMENT_SERVICE_ENDPOINT}${path}`, {
                userId,
            });

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
        }
    }

    async dislikeComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;
        const path = req.originalUrl.replace('/api/comments', '');

        try {
            const response = await axios.put(`${COMMENT_SERVICE_ENDPOINT}${path}`, {
                userId,
            });

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
        }
    }

    async createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;
        const { postId } = req.params;
        try {
            const user = await this.getUserUseCase.execute(userId);

            if (!user) {
                throw new NotFoundError();
            }

            const response = await axios.post(`${COMMENT_SERVICE_ENDPOINT}`, {
                ...req.body,
                postId: postId,
                author: {
                    userId: user.userId,
                    username: user.username,
                    imageUrl: user.imageUrl,
                },
            });

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
        }
    }

    async getCommentsByPostId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const path = req.originalUrl.replace('/api/comments', '');

        try {
            const response = await axios.get(`${COMMENT_SERVICE_ENDPOINT}${path}`);

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
        }
    }

    async commentService(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
