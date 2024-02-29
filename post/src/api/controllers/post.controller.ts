import { Request, Response, NextFunction } from 'express';

import { cloudinary } from '../../config/cloudinary.config';

import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

import {
    CreatePostUseCase,
    DeletePostUseCase,
    DisLikePostUseCase,
    GetAllPostsUseCase,
    GetOnePostUseCase,
    GetSavedPostsUseCase,
    GetUserFeedPostsUseCase,
    GetUserPostsUseCase,
    LikePostUseCase,
    UpdatePostUseCase,
} from '../../domain/interfaces/use-cases/';

import { PostControllerInterface } from '../interfaces/controllers/post.controller';
import { NotAuthorizedError, NotFoundError } from '@scxsocialcommon/errors';

import { CloudinaryFile } from '../../config/cloudinary.config';
import sharp from 'sharp';
import { PostRequestModel } from '../../domain/entities/post';

import { PostCreatedPublisher } from '../events/pub/post-created-publisher';
import { natsWrapper } from '../../../nats-wrapper';
import { PostDeletedPublisher } from '../events/pub/post-deleted-publisher';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

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
        getSavedPostsUseCase: GetSavedPostsUseCase
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
        try {
            const feedPosts = await this.getUserFeedPostsUseCase.execute();

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

            // Emit and event to the notification service

            res.send({});
        } catch (error) {
            next(error);
        }
    }

    async disLikePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;
        const postId = req.params.postId;
        try {
            await this.disLikePostUseCase.execute(userId, postId);

            res.send({});
        } catch (error) {
            next(error);
        }
    }

    async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const files = req.files as Express.Multer.File[];

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
                    imageUrl: req.body.imageUrl,
                },
                imageUrls: [],
            };

            const uploadPromises: Promise<void>[] = [];

            const filesToUpload: CloudinaryFile[] = req.files as CloudinaryFile[];
            if (!filesToUpload || filesToUpload.length === 0) {
                return next(new Error('No files provided'));
            }

            for (const file of filesToUpload) {
                const resizedBuffer: Buffer = await sharp(file.buffer).resize({ width: 900 }).toBuffer();
                const uploadPromise = new Promise<void>((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            resource_type: 'auto',
                            folder: 'posts',
                        } as any,
                        (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                            if (err) {
                                console.error('Cloudinary upload error:', err);
                                reject(err);
                            } else if (!result) {
                                console.error('Cloudinary upload error: Result is undefined');
                                reject(new Error('Cloudinary upload result is undefined'));
                            } else {
                                nwePost.imageUrls.push(result.secure_url);
                                resolve();
                            }
                        }
                    );
                    uploadStream.end(resizedBuffer);
                });
                uploadPromises.push(uploadPromise);
            }

            await Promise.all(uploadPromises);

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

            if (post.author.userId !== userId) {
                throw new NotAuthorizedError();
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
