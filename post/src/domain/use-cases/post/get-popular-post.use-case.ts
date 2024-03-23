import { PostModel } from '../../entities/post';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { GetPopularPostsUseCase } from '../../interfaces/use-cases/posts';

export class GetPopularPosts implements GetPopularPostsUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(): Promise<[] | PostModel[]> {
        return this.postRepository.getPopularPosts();
    }
}
