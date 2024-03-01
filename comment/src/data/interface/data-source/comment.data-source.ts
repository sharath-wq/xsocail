import { ICommentAuthorDetailsModel, ICommentRequestModel, ICommentResponseModel } from '../../../domain/entities/comment';

export interface ICommentDataSource {
    create(comment: ICommentRequestModel): Promise<ICommentResponseModel | null>;
    delete(id: string): Promise<void>;
    getByPostId(postId: string): Promise<ICommentResponseModel[] | []>;
    like(id: string, userId: string): Promise<void>;
    dislike(id: string, userIndex: number): Promise<void>;
    getById(id: string): Promise<ICommentResponseModel | null>;
    findByUserIdAndUpdate(userId: string, data: ICommentAuthorDetailsModel): Promise<void>;
}
