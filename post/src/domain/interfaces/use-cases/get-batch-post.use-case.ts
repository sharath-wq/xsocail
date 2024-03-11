import { PostModel } from '../../entities/post';

export interface GetBatchPostUseCase {
    execute(postIds: string[]): Promise<PostModel[] | []>;
}
