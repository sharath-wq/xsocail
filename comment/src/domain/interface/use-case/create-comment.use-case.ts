import { ICommentRequestModel, ICommentResponseModel } from '../../entities/comment';

export interface ICreateCommentUseCase {
    execute(comment: ICommentRequestModel): Promise<ICommentResponseModel | null>;
}
