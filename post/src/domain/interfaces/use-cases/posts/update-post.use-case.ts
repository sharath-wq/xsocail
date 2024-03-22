import { PostModel, PostUpdateModel } from '../../../entities/post';

export interface UpdatePostUseCase {
    execute(id: string, data: PostUpdateModel, userId: string): Promise<PostModel | null>;
}
