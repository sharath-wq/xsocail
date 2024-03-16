import express from 'express';
import { PostController } from '../controllers/post.controller';

export default function PostRouter() {
    const router = express.Router();

    const postController = new PostController();

    router.get('/:postId', async (req, res, next) => {
        postController.singlePost(req, res, next);
    });

    router.all('/*', async (req, res, next) => {
        postController.postService(req, res, next);
    });

    return router;
}
