import { Request, Response, NextFunction } from 'express';

import {
    CreatePostUseCase,
    DeletePostUseCase,
    GetAllPostsUseCase,
    GetOnePostUseCase,
    GetUserPostsUseCase,
    UpdatePostUseCase,
} from '../../domain/interfaces/use-cases/';

import { PostControllerInterface } from '../interfaces/controllers/post.controller';
import { NotAuthorizedError, NotFoundError, currentUser } from '@scxsocialcommon/errors';

export class PostController implements PostControllerInterface {
    createPostUseCase: CreatePostUseCase;
    deletePostUseCase: DeletePostUseCase;
    getAllPostsUseCase: GetAllPostsUseCase;
    getOnePostUseCase: GetOnePostUseCase;
    getUserPostsUseCase: GetUserPostsUseCase;
    updatePostUseCase: UpdatePostUseCase;

    constructor(
        createPostUseCase: CreatePostUseCase,
        deletePostUseCase: DeletePostUseCase,
        getAllPostsUseCase: GetAllPostsUseCase,
        getOnePostUseCase: GetOnePostUseCase,
        getUserPostsUseCase: GetUserPostsUseCase,
        updatePostUseCase: UpdatePostUseCase
    ) {
        this.createPostUseCase = createPostUseCase;
        this.deletePostUseCase = deletePostUseCase;
        this.getAllPostsUseCase = getAllPostsUseCase;
        this.getOnePostUseCase = getOnePostUseCase;
        this.getUserPostsUseCase = getUserPostsUseCase;
        this.updatePostUseCase = updatePostUseCase;
    }
    async createPost(req: Request, res: Response): Promise<void> {
        const { reqBody } = req.body;
        const userId = req.currentUser?.id;

        try {
            const post = await this.createPostUseCase.execute(reqBody, userId!);
            res.status(201).send(post);
        } catch (error) {
            throw error;
        }
    }

    async updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { reqBody } = req.body;
        const userId = req.currentUser?.id;
        const id = req.params.id;
        try {
            const existingPost = await this.getOnePostUseCase.execute(id);

            if (!existingPost) {
                throw new NotFoundError();
            }

            if (existingPost.author !== userId) {
                throw new NotAuthorizedError();
            }

            const updatedPost = await this.updatePostUseCase.execute(id, reqBody, userId!);
            res.status(200).send(updatedPost);
        } catch (error: any) {
            next(error);
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        const userId = req.currentUser?.id;
        const id = req.params.id;
        try {
            const post = await this.getOnePostUseCase.execute(id);

            if (!post) {
                throw new NotFoundError();
            }

            if (post.author !== userId) {
                throw new NotAuthorizedError();
            }

            await this.deletePostUseCase.execute(id);
            res.status(200).send({});
        } catch (error) {
            throw error;
        }
    }

    async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await this.getAllPostsUseCase.execute();
            res.send(posts);
        } catch (error) {
            throw error;
        }
    }

    async getOnePost(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
            const post = await this.getOnePostUseCase.execute(id);
            res.send(post);
        } catch (error) {
            throw error;
        }
    }

    async getUserPosts(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;
        try {
            const userPost = await this.getUserPostsUseCase.execute(userId);
        } catch (error) {
            throw error;
        }
    }
}
