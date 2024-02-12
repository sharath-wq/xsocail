import { CreatePostUseCase } from '../../interfaces/use-cases';

import { PostRepository } from '../../interfaces/repository/post.repository';
import { PostRequestModel, PostResponseModel } from '../../entities/post';

export class CreatePost implements CreatePostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async execute(post: PostRequestModel, authorId: string): Promise<PostResponseModel | null> {
        const result = await this.postRepository.createPost(post, authorId);
        return result;
    }
}
