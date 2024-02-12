import { PostModel } from '../../entities/post';

export interface GetAllPostsUseCase {
    execute(): Promise<PostModel[] | []>;
}
