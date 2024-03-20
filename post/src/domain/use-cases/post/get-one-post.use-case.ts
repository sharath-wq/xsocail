import { GetOnePostUseCase } from '../../interfaces/use-cases/posts';

import { PostRepository } from '../../interfaces/repository/post.repository';
import { PostModel } from '../../entities/post';
export class GetOnePost implements GetOnePostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async execute(id: string): Promise<PostModel | null> {
        const result = await this.postRepository.getOnePost(id);
        return result;
    }
}
