import { Request, Response, NextFunction } from 'express';

import { cloudinary } from '../../config/cloudinary.config';

import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

import {
    CreatePostUseCase,
    DeletePostUseCase,
    GetAllPostsUseCase,
    GetOnePostUseCase,
    GetUserPostsUseCase,
    UpdatePostUseCase,
} from '../../domain/interfaces/use-cases/';

import { PostControllerInterface } from '../interfaces/controllers/post.controller';
import { NotAuthorizedError, NotFoundError } from '@scxsocialcommon/errors';

import { CloudinaryFile } from '../../config/cloudinary.config';
import sharp from 'sharp';
import { PostRequestModel } from '../../domain/entities/post';

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

    async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser?.id;
        const files = req.files as Express.Multer.File[];

        try {
            const nwePost: PostRequestModel = {
                caption: req.body.caption,
                tags: req.body.tags,
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
                                console.log(result.secure_url);
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

            const post = await this.createPostUseCase.execute(nwePost, userId!);
            res.status(201).send(post);
        } catch (error: any) {
            console.error('Error creating post:', error);
            res.status(error.http_code || 500).send({ error: error.message || 'Internal Server Error' });
        }
    }

    async updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser?.id;
        const id = req.params.id;

        try {
            const existingPost = await this.getOnePostUseCase.execute(id);

            if (!existingPost) {
                throw new NotFoundError();
            }

            if (existingPost.authorId !== userId) {
                throw new NotAuthorizedError();
            }

            const updatedPost = await this.updatePostUseCase.execute(id, req.body, userId!);
            res.status(200).send(updatedPost);
        } catch (error: any) {
            next(error);
        }
    }

    async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser?.id;
        const id = req.params.id;
        try {
            const post = await this.getOnePostUseCase.execute(id);

            if (!post) {
                throw new NotFoundError();
            }

            if (post.authorId !== userId) {
                throw new NotAuthorizedError();
            }

            await this.deletePostUseCase.execute(id);
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

    async getUserPosts(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;
        try {
            const userPost = await this.getUserPostsUseCase.execute(userId);
        } catch (error) {
            throw error;
        }
    }
}
