import { PostModel } from '../../entities/post';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { GetUserFeedPostsUseCase } from '../../interfaces/use-cases';

export class GetUserFeedPosts implements GetUserFeedPostsUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(): Promise<[] | PostModel[]> {
        const result = await this.postRepository.getUserFeeds();
        return result;
    }
}
