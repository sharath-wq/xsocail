import { PostModel, PostRequestModel } from '../../entities/post';

export interface CreatePostUseCase {
    execute(post: PostRequestModel, authorId: string): Promise<PostModel | null>;
}
