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
} from '../../domain/interfaces/use-cases';

export default function PostRouter(
    createPostUseCase: CreatePostUseCase,
    deletePostUseCase: DeletePostUseCase,
    getAllPostsUseCase: GetAllPostsUseCase,
    getOnePostUseCase: GetOnePostUseCase,
    updatePostUseCase: UpdatePostUseCase,
    getUserPostsUseCase: GetUserPostsUseCase
) {
    const router = express.Router();
    const postController = new PostController(
        createPostUseCase,
        deletePostUseCase,
        getAllPostsUseCase,
        getOnePostUseCase,
        getUserPostsUseCase,
        updatePostUseCase
    );

    router.get('/', async (req, res) => {
        postController.getAllPosts(req, res);
    });

    router.post('/', upload.array('files[]'), async (req, res, next) => {
        postController.createPost(req, res, next);
    });

    router.patch('/:id', async (req, res, next) => {
        postController.updatePost(req, res, next);
    });

    router.get('/:id', async (req, res) => {
        postController.getOnePost(req, res);
    });

    router.get('/user/:userId', async (req, res) => {
        postController.getUserPosts(req, res);
    });

    router.delete('/:id', async (req, res) => {
        postController.deletePost(req, res);
    });

    return router;
}
