import { PostBulkUpdateRequestModel } from '../../entities/post';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { UpdatePostsByUserIdUseCase } from '../../interfaces/use-cases';

export class UpdatePostsByUserId implements UpdatePostsByUserIdUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(userId: string, post: PostBulkUpdateRequestModel): Promise<void> {
        await this.postRepository.findPostsByUserIdAndUpdate(userId, post);
    }
}
