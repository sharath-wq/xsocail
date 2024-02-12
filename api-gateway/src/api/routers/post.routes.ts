import express from 'express';

import { requireAuth } from '@scxsocialcommon/errors';
import { PostController } from '../controllers/post.controller';

export default function PostRouter() {
    const router = express.Router();

    const postController = PostController();

    router.get('/', postController.getAllPosts);
    router.post('/', requireAuth, postController.createPost);
    router.delete('/:id', requireAuth, postController.deletePost);
    router.patch('/:id', requireAuth, postController.updatePost);
    router.get('/user/:userId', postController.getPostsByUser);

    return router;
}
