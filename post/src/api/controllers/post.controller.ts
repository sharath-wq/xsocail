import { Request, Response, NextFunction } from 'express';

import {
    CreatePostUseCase,
    DeletePostUseCase,
    DisLikePostUseCase,
    GetAllPostsUseCase,
    GetBatchPostUseCase,
    GetOnePostUseCase,
    GetSavedPostsUseCase,
    GetUserFeedPostsUseCase,
    GetUserPostsUseCase,
    LikePostUseCase,
    UpdatePostUseCase,
} from '../../domain/interfaces/use-cases/posts';

import { PostControllerInterface } from '../interfaces/controllers/post.controller';
import { NotAuthorizedError, NotFoundError } from '@scxsocialcommon/errors';

import { PostRequestModel } from '../../domain/entities/post';

import { PostCreatedPublisher } from '../events/pub/post-created-publisher';
import { natsWrapper } from '../../../nats-wrapper';
import { PostDeletedPublisher } from '../events/pub/post-deleted-publisher';
import { NotificationCreatedPublisher } from '../events/pub/notification-created-publisher';
export class PostController implements PostControllerInterface {
    createPostUseCase: CreatePostUseCase;
    deletePostUseCase: DeletePostUseCase;
    getAllPostsUseCase: GetAllPostsUseCase;
    getOnePostUseCase: GetOnePostUseCase;
    getUserPostsUseCase: GetUserPostsUseCase;
    updatePostUseCase: UpdatePostUseCase;
    likePostUseCase: LikePostUseCase;
    disLikePostUseCase: DisLikePostUseCase;
    getUserFeedPostsUseCase: GetUserFeedPostsUseCase;
    getSavedPostsUseCase: GetSavedPostsUseCase;
    getBatchPostUseCase: GetBatchPostUseCase;

    constructor(
        createPostUseCase: CreatePostUseCase,
        deletePostUseCase: DeletePostUseCase,
        getAllPostsUseCase: GetAllPostsUseCase,
        getOnePostUseCase: GetOnePostUseCase,
        getUserPostsUseCase: GetUserPostsUseCase,
        updatePostUseCase: UpdatePostUseCase,
        likePostUseCase: LikePostUseCase,
        disLikePostUseCase: DisLikePostUseCase,
        getUserFeedPostsUseCase: GetUserFeedPostsUseCase,
        getSavedPostsUseCase: GetSavedPostsUseCase,
        getBatchPostUseCase: GetBatchPostUseCase
    ) {
        this.createPostUseCase = createPostUseCase;
        this.deletePostUseCase = deletePostUseCase;
        this.getAllPostsUseCase = getAllPostsUseCase;
        this.getOnePostUseCase = getOnePostUseCase;
        this.getUserPostsUseCase = getUserPostsUseCase;
        this.updatePostUseCase = updatePostUseCase;
        this.likePostUseCase = likePostUseCase;
        this.disLikePostUseCase = disLikePostUseCase;
        this.getUserFeedPostsUseCase = getUserFeedPostsUseCase;
        this.getSavedPostsUseCase = getSavedPostsUseCase;
        this.getBatchPostUseCase = getBatchPostUseCase;
    }

    async getBatchPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { ids } = req.body;
        try {
            const posts = await this.getBatchPostUseCase.execute(ids);
            res.send(posts);
        } catch (error) {
            next(error);
        }
    }

    async getSavedPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { postIds } = req.body;
        try {
            const savedPosts = await this.getSavedPostsUseCase.execute(postIds);
            res.send(savedPosts);
        } catch (error) {
            next(error);
        }
    }
    async getUserFeed(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userIds } = req.body;
        try {
            const feedPosts = await this.getUserFeedPostsUseCase.execute(userIds);

            res.send(feedPosts);
        } catch (error) {
            next(error);
        }
    }

    async likePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;
        const postId = req.params.postId;
        try {
            await this.likePostUseCase.execute(userId, postId);

            const post = await this.getOnePostUseCase.execute(postId);

            if (post) {
                await new NotificationCreatedPublisher(natsWrapper.client).publish({
                    postId,
                    senderId: userId,
                    receiverId: post.author.userId,
                    type: 'Like',
                    content: 'Liked your post',
                });
            }

            res.send({ status: 'ok' });
        } catch (error) {
            next(error);
        }
    }

    async disLikePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;
        const postId = req.params.postId;
        try {
            await this.disLikePostUseCase.execute(userId, postId);

            res.send({ status: 'ok' });
        } catch (error) {
            next(error);
        }
    }

    async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.currentUser) {
                throw new NotAuthorizedError();
            }

            const nwePost: PostRequestModel = {
                caption: req.body.caption,
                tags: req.body.tags,
                author: {
                    userId: req.body.userId,
                    username: req.body.username,
                    imageUrl: req.body.userImageUrl,
                },
                imageUrls: req.body.imageUrls,
                isEdited: false,
            };

            const post = await this.createPostUseCase.execute(nwePost, req.currentUser.userId);

            if (post) {
                await new PostCreatedPublisher(natsWrapper.client).publish({
                    auhtorId: post.author.userId,
                    postId: post.id,
                });
            }

            res.status(201).send(post);
        } catch (error: any) {
            console.error('Error creating post:', error);
            res.status(error.http_code || 500).send({ error: error.message || 'Internal Server Error' });
        }
    }

    async updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser?.userId;
        const id = req.params.id;

        console.log(req.body);

        try {
            const existingPost = await this.getOnePostUseCase.execute(id);

            if (!existingPost) {
                throw new NotFoundError();
            }

            if (existingPost.author.userId !== userId) {
                throw new NotAuthorizedError();
            }

            const updatedPost = await this.updatePostUseCase.execute(id, req.body, userId!);
            res.status(200).send(updatedPost);
        } catch (error: any) {
            next(error);
        }
    }

    async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser?.userId;
        const id = req.params.id;
        try {
            const post = await this.getOnePostUseCase.execute(id);

            if (!post) {
                throw new NotFoundError();
            }

            await this.deletePostUseCase.execute(id);

            await new PostDeletedPublisher(natsWrapper.client).publish({
                auhtorId: post.author.userId,
                postId: post.id,
            });

            res.status(200).send({});
        } catch (error) {
            next(error);
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

    async getUserPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.params.userId;
        try {
            const userPosts = await this.getUserPostsUseCase.execute(userId);

            res.send(userPosts);
        } catch (error) {
            next(error);
        }
    }
}
