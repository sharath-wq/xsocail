import { PostModel } from '../../entities/post';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { GetPostByIdUseCase } from '../../interfaces/use-cases/get-post-by-id.use-case';

export class GetPostById implements GetPostByIdUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async execute(id: string): Promise<PostModel | null> {
        const result = await this.postRepository.getPostById(id);
        return result;
    }
}
