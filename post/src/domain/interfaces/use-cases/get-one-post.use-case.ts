import { PostResponseModel } from '../../entities/post';

export interface GetOnePostUseCase {
    execute(id: string): Promise<PostResponseModel | null>;
}
