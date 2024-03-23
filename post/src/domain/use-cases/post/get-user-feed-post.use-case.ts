import { PostModel } from '../../entities/post';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { GetUserFeedPostsUseCase } from '../../interfaces/use-cases/posts';

export class GetUserFeedPosts implements GetUserFeedPostsUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(userIds: string[], userId: string): Promise<[] | PostModel[]> {
        const result = await this.postRepository.getUserFeeds(userIds);

        const filteredResult = result.filter((post) => !post.reportedBy.includes(userId));

        return filteredResult;
    }
}
