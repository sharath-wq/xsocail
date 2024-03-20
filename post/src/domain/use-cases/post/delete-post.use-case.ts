import { DeletePostUseCase } from '../../interfaces/use-cases/posts';
import { PostRepository } from '../../interfaces/repository/post.repository';

export class DeletePost implements DeletePostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(id: string): Promise<void> {
        // check if the use has the previlage to do this

        await this.postRepository.deletePost(id);
    }
}
