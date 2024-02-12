import { PostRequestModel, PostResponseModel } from '../../entities/post';

export interface CreatePostUseCase {
    execute(post: PostRequestModel, authorId: string): Promise<PostResponseModel | null>;
}
