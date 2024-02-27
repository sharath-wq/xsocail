import { ICommentResponseModel } from '../../entities/comment';

export interface IGetByPostIdUseCase {
    execute(postId: string): Promise<ICommentResponseModel[] | []>;
}
