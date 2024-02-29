import { PostModel } from '../../entities/post';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { GetSavedPostsUseCase } from '../../interfaces/use-cases';

export class GetSavedPosts implements GetSavedPostsUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(postIds: string[]): Promise<PostModel[] | []> {
        const results = await this.postRepository.getSavedPosts(postIds);
        return results;
    }
}
