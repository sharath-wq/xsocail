import { UpdatePostUseCase } from '../../interfaces/use-cases';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { PostRequestModel, PostResponseModel } from '../../entities/post';

export class UpdatePost implements UpdatePostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async execute(id: string, data: PostRequestModel, userId: string): Promise<PostResponseModel | null> {
        // check if the user id and the auther id is same
        const existingPost = await this.postRepository.getPostById(id);

        if (existingPost && existingPost.author === userId) {
            const result = await this.postRepository.updatePost(id, data);
            return result;
        }

        return null;
    }
}
