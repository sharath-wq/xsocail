import { GetOnePostUseCase } from '../../interfaces/use-cases';

import { PostRepository } from '../../interfaces/repository/post.repository';
import { PostResponseModel } from '../../entities/post';
export class GetOnePost implements GetOnePostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async execute(id: string): Promise<PostResponseModel | null> {
        const result = await this.postRepository.getOnePost(id);
        return result;
    }
}
