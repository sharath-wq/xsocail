import { ICommentRequestModel, ICommentResponseModel } from '../../entities/comment';

export interface ICommentRepository {
    createComment(comment: ICommentRequestModel): Promise<ICommentResponseModel | null>;
    deleteComment(id: string): Promise<void>;
    getByPostId(postId: string): Promise<ICommentResponseModel[] | []>;
}
