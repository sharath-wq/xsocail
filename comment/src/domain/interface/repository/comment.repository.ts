import { ICommentRequestModel, ICommentResponseModel } from '../../entities/comment';

export interface ICommentRepository {
    createComment(comment: ICommentRequestModel): Promise<ICommentResponseModel | null>;
    deleteComment(id: string): Promise<void>;
    getByPostId(postId: string): Promise<ICommentResponseModel[] | []>;
    like(id: string, userId: string): Promise<void>;
    disLike(id: string, userIndex: number): Promise<void>;
    getById(id: string): Promise<ICommentResponseModel | null>;
}
