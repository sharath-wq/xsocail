import { CreatePostUseCase } from '../../interfaces/use-cases';
import { UpdatePostUseCase } from '../../interfaces/use-cases';
import { GetAllPostsUseCase } from '../../interfaces/use-cases';
import { GetOnePostUseCase } from '../../interfaces/use-cases';
import { DeletePostUseCase } from '../../interfaces/use-cases';
import { GetUserPostsUseCase } from '../../interfaces/use-cases';
import { LikePost } from './like-post.use-case';
import { DisLikePost } from './dislike-post.use-case';

export {
    CreatePostUseCase,
    UpdatePostUseCase,
    GetAllPostsUseCase,
    GetOnePostUseCase,
    DeletePostUseCase,
    GetUserPostsUseCase,
    LikePost,
    DisLikePost,
};
