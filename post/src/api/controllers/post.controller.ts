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
import { NotAuthorizedError, NotFoundError, currentUser } from '@scxsocialcommon/errors';

import { CloudinaryFile } from '../../config/cloudinary.config';
import sharp from 'sharp';

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

        console.log(files);

        try {
            const files: CloudinaryFile[] = req.files as CloudinaryFile[];
            if (!files || files.length === 0) {
                return next(new Error('No files provided'));
            }

            const cloudinaryUrls: string[] = [];
            for (const file of files) {
                const resizedBuffer: Buffer = await sharp(file.buffer).resize({ width: 800, height: 600 }).toBuffer();
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'posts',
                    } as any,
                    (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                        if (err) {
                            console.error('Cloudinary upload error:', err);
                            return next(err);
                        }
                        if (!result) {
                            console.error('Cloudinary upload error: Result is undefined');
                            return next(new Error('Cloudinary upload result is undefined'));
                        }
                        cloudinaryUrls.push(result.secure_url);

                        if (cloudinaryUrls.length === files.length) {
                            //All files processed now get your images here
                            req.body.cloudinaryUrls = cloudinaryUrls;
                            next();
                        }
                    }
                );
                uploadStream.end(resizedBuffer);
            }

            const post = await this.createPostUseCase.execute(req.body, userId!);
            res.status(201).send(post);
        } catch (error: any) {
            console.error('Error creating post:', error);
            res.status(error.http_code || 500).send({ error: error.message || 'Internal Server Error' });
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

            if (existingPost.authorId !== userId) {
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

            if (post.authorId !== userId) {
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
