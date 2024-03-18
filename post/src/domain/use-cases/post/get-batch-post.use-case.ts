import { NotificationPostModel, PostModel } from '../../entities/post';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { GetBatchPostUseCase } from '../../interfaces/use-cases';

export class GetBatchPost implements GetBatchPostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(postIds: string[]): Promise<NotificationPostModel[] | []> {
        return await this.postRepository.getBatchPost(postIds);
    }
}
