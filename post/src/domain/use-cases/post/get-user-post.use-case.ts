import { GetUserPostsUseCase } from '../../interfaces/use-cases/posts';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { PostModel } from '../../entities/post';

export class GetUserPosts implements GetUserPostsUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(userId: string): Promise<PostModel[] | []> {
        const result = await this.postRepository.getPostsByUser(userId);
        return result;
    }
}
