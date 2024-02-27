import { ICommentRequestModel, ICommentResponseModel } from '../../../domain/entities/comment';

export interface ICommentDataSource {
    create(comment: ICommentRequestModel): Promise<ICommentResponseModel | null>;
    delete(id: string): Promise<void>;
    getByPostId(postId: string): Promise<ICommentResponseModel[] | []>;
}
