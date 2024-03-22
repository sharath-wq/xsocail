import { PostModel } from '../../../entities/post';

export interface GetPopularPostsUseCase {
    execute(): Promise<PostModel[] | []>;
}
