import { PostRequestModel, PostResponseModel } from '../../entities/post';

export interface UpdatePostUseCase {
    execute(id: string, data: PostRequestModel, userId: string): Promise<PostResponseModel | null>;
}
