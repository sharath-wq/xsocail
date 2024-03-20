import { PostModel } from '../../entities/post';

export interface GetUserFeedPostsUseCase {
    execute(userIds: string[]): Promise<PostModel[] | []>;
}
