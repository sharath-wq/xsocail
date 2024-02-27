import { ICommentDataSource } from '../../data/interface/data-source/comment.data-source';
import { ICommentRequestModel, ICommentResponseModel } from '../entities/comment';
import { ICommentRepository } from '../interface/repository/comment.repository';

export class CommentRepository implements ICommentRepository {
    commentDataSource: ICommentDataSource;

    constructor(commentDataSource: ICommentDataSource) {
        this.commentDataSource = commentDataSource;
    }

    async getByPostId(postId: string): Promise<ICommentResponseModel[] | []> {
        const results = await this.commentDataSource.getByPostId(postId);
        return results;
    }

    async createComment(comment: ICommentRequestModel): Promise<ICommentResponseModel | null> {
        const result = await this.commentDataSource.create(comment);
        return result;
    }

    async deleteComment(id: string): Promise<void> {
        await this.commentDataSource.delete(id);
    }
}
