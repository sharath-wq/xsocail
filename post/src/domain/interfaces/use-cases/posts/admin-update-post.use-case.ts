import { PostModel, PostUpdateModel } from '../../../entities/post';

export interface AdminUpdatePostUseCase {
    execute(id: string, data: PostUpdateModel): Promise<PostModel | null>;
}
