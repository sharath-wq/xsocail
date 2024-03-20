import { NotFoundError } from '@scxsocialcommon/errors';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { LikePostUseCase } from '../../interfaces/use-cases/posts';

export class LikePost implements LikePostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(userId: string, postId: string): Promise<void> {
        const post = await this.postRepository.getPostById(postId);

        if (!post) {
            throw new NotFoundError();
        }

        if (!post.likes.includes(userId)) {
            await this.postRepository.likePost(userId, postId);
        }
    }
}
