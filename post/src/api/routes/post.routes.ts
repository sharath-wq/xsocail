import express, { Request, Response } from 'express';

import { PostController } from '../controllers/post.controller';
import multer, { Multer } from 'multer';

const storage = multer.memoryStorage();
export const upload: Multer = multer({ storage: storage });

import {
    CreatePostUseCase,
    DeletePostUseCase,
    GetAllPostsUseCase,
    GetOnePostUseCase,
    UpdatePostUseCase,
    GetUserPostsUseCase,
    LikePostUseCase,
    DisLikePostUseCase,
    GetUserFeedPostsUseCase,
    GetSavedPostsUseCase,
    GetBatchPostUseCase,
} from '../../domain/interfaces/use-cases';
import { NextFunction } from 'express-serve-static-core';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@scxsocialcommon/errors';

export default function PostRouter(
    createPostUseCase: CreatePostUseCase,
    deletePostUseCase: DeletePostUseCase,
    getAllPostsUseCase: GetAllPostsUseCase,
    getOnePostUseCase: GetOnePostUseCase,
    updatePostUseCase: UpdatePostUseCase,
    getUserPostsUseCase: GetUserPostsUseCase,
    likePostUseCase: LikePostUseCase,
    disLikePostUseCase: DisLikePostUseCase,
    getUserFeedPostsUseCase: GetUserFeedPostsUseCase,
    getSavedPostsUseCase: GetSavedPostsUseCase,
    getBatchPostUseCase: GetBatchPostUseCase
) {
    const router = express.Router();
    const postController = new PostController(
        createPostUseCase,
        deletePostUseCase,
        getAllPostsUseCase,
        getOnePostUseCase,
        getUserPostsUseCase,
        updatePostUseCase,
        likePostUseCase,
        disLikePostUseCase,
        getUserFeedPostsUseCase,
        getSavedPostsUseCase,
        getBatchPostUseCase
    );

    router.patch('/like/:postId', async (req, res, next) => {
        postController.likePost(req, res, next);
    });

    router.patch('/dislike/:postId', async (req, res, next) => {
        postController.disLikePost(req, res, next);
    });

    router.get('/feed', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
        postController.getUserFeed(req, res, next);
    });

    router.get('/', async (req, res) => {
        postController.getAllPosts(req, res);
    });

    router.post('/', upload.array('files[]'), validateRequest, async (req: Request, res: Response, next: NextFunction) => {
        postController.createPost(req, res, next);
    });

    router.post('/batch', async (req: Request, res: Response, next: NextFunction) => {
        postController.getBatchPosts(req, res, next);
    });

    router.patch(
        '/:id',
        upload.array('files[]'),
        validateRequest,
        async (req: Request, res: Response, next: NextFunction) => {
            postController.updatePost(req, res, next);
        }
    );

    router.get('/:id', async (req, res) => {
        postController.getOnePost(req, res);
    });

    router.get('/user/:userId', async (req, res, next) => {
        postController.getUserPosts(req, res, next);
    });

    router.delete('/:id', async (req, res, next) => {
        postController.deletePost(req, res, next);
    });

    router.post('/saved', async (req, res, next) => {
        postController.getSavedPosts(req, res, next);
    });

    return router;
}
