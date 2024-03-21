import { PostModel } from '../../../entities/post';

export interface GetUserFeedPostsUseCase {
    execute(userIds: string[], userId: string): Promise<PostModel[] | []>;
}
