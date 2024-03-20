import { NotFoundError } from '@scxsocialcommon/errors';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { DisLikePostUseCase } from '../../interfaces/use-cases/posts';

export class DisLikePost implements DisLikePostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(userId: string, postId: string): Promise<void> {
        const post = await this.postRepository.getPostById(postId);

        if (!post) {
            throw new NotFoundError();
        }

        const userIndex = post.likes.indexOf(userId);

        if (userIndex !== -1) {
            await this.postRepository.dislikePost(userIndex, postId);
        }
    }
}
