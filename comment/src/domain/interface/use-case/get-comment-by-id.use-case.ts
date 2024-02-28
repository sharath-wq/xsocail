import { ICommentResponseModel } from '../../entities/comment';

export interface IGetCommentByIdUseCase {
    execute(id: string): Promise<ICommentResponseModel | null>;
}
