import { PostModel } from '../../entities/post';

export interface GetUserPostsUseCase {
    execute(userId: string): Promise<PostModel[] | []>;
}
