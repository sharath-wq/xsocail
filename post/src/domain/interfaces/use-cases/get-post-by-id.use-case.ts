import { PostModel, PostResponseModel } from '../../entities/post';

export interface GetPostByIdUseCase {
    execute(id: string): Promise<PostModel | null>;
}
