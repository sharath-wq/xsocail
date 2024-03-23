import { AdminUpdatePostUseCase } from '../../interfaces/use-cases/posts';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { PostModel, PostUpdateModel } from '../../entities/post';

export class AdminUpdatePost implements AdminUpdatePostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async execute(id: string, data: PostUpdateModel): Promise<PostModel | null> {
        const result = await this.postRepository.updatePost(id, { ...data });
        return result;
    }
}
