import { PostBulkUpdateRequestModel } from '../../entities/post';

export interface UpdatePostsByUserIdUseCase {
    execute(userId: string, post: PostBulkUpdateRequestModel): Promise<void>;
}
