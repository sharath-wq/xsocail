import { ICommentDataSource } from '../../data/interface/data-source/comment.data-source';
import { ICommentAuthorDetailsModel, ICommentRequestModel, ICommentResponseModel } from '../entities/comment';
import { ICommentRepository } from '../interface/repository/comment.repository';

export class CommentRepository implements ICommentRepository {
    commentDataSource: ICommentDataSource;

    constructor(commentDataSource: ICommentDataSource) {
        this.commentDataSource = commentDataSource;
    }

    async findByUserIdAndUpdate(userId: string, data: ICommentAuthorDetailsModel): Promise<void> {
        await this.commentDataSource.findByUserIdAndUpdate(userId, data);
    }

    async getById(id: string): Promise<ICommentResponseModel | null> {
        const result = await this.commentDataSource.getById(id);
        return result;
    }

    async like(id: string, userId: string): Promise<void> {
        const result = await this.commentDataSource.like(id, userId);
    }

    async disLike(id: string, userIndex: number): Promise<void> {
        const result = await this.commentDataSource.dislike(id, userIndex);
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
