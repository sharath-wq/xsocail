import { GetAllPostsUseCase } from '../../interfaces/use-cases';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { PostModel } from '../../entities/post';

export class GetAllPosts implements GetAllPostsUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async execute(): Promise<PostModel[] | []> {
        const result = await this.postRepository.getAllPosts();
        return result;
    }
}
