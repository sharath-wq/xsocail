import { CreatePostUseCase } from '../../interfaces/use-cases/posts';

import { PostRepository } from '../../interfaces/repository/post.repository';
import { PostModel, PostRequestModel } from '../../entities/post';

export class CreatePost implements CreatePostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async execute(post: PostRequestModel, authorId: string): Promise<PostModel | null> {
        const result = await this.postRepository.createPost(post, authorId);
        return result;
    }
}
