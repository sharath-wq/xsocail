import { PostModel } from '../../../entities/post';

export interface GetAllPostsUseCase {
    execute(q: string): Promise<PostModel[] | []>;
}
