import { PostModel, PostResponseModel } from '../../entities/post';

export interface GetOnePostUseCase {
    execute(id: string): Promise<PostModel | null>;
}
