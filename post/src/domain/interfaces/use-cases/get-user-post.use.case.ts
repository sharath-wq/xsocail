import { PostModel } from '../../entities/post';

export interface GetUserFeedPostsUseCase {
    execute(): Promise<PostModel[] | []>;
}
