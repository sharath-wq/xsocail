import { UpdatePostUseCase } from '../../interfaces/use-cases/posts';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { PostModel, PostRequestModel, PostUpdateModel } from '../../entities/post';

export class UpdatePost implements UpdatePostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async execute(id: string, data: PostUpdateModel, userId: string): Promise<PostModel | null> {
        const existingPost = await this.postRepository.getPostById(id);

        if (existingPost && existingPost.author.userId === userId) {
            const result = await this.postRepository.updatePost(id, { ...data, isEdited: true });
            return result;
        }

        return null;
    }
}
