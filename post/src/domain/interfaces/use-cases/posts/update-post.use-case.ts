import { PostModel, PostRequestModel } from '../../../entities/post';

export interface UpdatePostUseCase {
    execute(id: string, data: PostRequestModel, userId: string): Promise<PostModel | null>;
}
