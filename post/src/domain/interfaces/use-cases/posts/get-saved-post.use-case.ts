import { PostModel } from '../../../entities/post';

export interface GetSavedPostsUseCase {
    execute(postIds: string[]): Promise<PostModel[] | []>;
}
