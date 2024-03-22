import express from 'express';
import { PostController } from '../controllers/post.controller';
import { requireAuth } from '@scxsocialcommon/errors';

export default function PostRouter() {
    const router = express.Router();

    const postController = new PostController();

    router.get('/feed', async (req, res, next) => {
        postController.postFeed(req, res, next);
    });

    router.get('/reports', requireAuth, async (req, res, next) => {
        postController.getReportedPosts(req, res, next);
    });

    router.all('/*', async (req, res, next) => {
        postController.postService(req, res, next);
    });

    return router;
}
