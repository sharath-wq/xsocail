import { ICommentRequestModel, ICommentResponseModel } from '../../../domain/entities/comment';
import { ICommentDataSource } from '../../interface/data-source/comment.data-source';
import { Comment } from './Schema/comment.schema';

export class CommentDataSource implements ICommentDataSource {
    async getById(id: string): Promise<ICommentResponseModel | null> {
        try {
            const result = await Comment.findOne({ _id: id });

            if (!result) {
                return null;
            }

            return {
                id: result.id,
                author: result.author,
                content: result.content,
                createdAt: result.createdAt,
                likes: result.likes,
                postId: result.postId,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async like(id: string, userId: string): Promise<void> {
        try {
            const comment = await Comment.findById(id);
            if (comment) {
                comment.likes.push(userId);
                await comment.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async dislike(id: string, userIndex: number): Promise<void> {
        try {
            const comment = await Comment.findById(id);
            if (comment) {
                comment.likes.splice(userIndex, 1);
                await comment.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getByPostId(postId: string): Promise<ICommentResponseModel[] | []> {
        try {
            const results = await Comment.find({ postId: postId }).sort({ createdAt: -1 });

            if (!results) {
                return [];
            }

            return results.map((item) => ({
                id: item.id,
                author: item.author,
                content: item.content,
                createdAt: item.createdAt,
                likes: item.likes,
                postId: item.postId,
            }));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async create(comment: ICommentRequestModel): Promise<ICommentResponseModel | null> {
        try {
            const result = await Comment.create(comment);

            if (!result) {
                return null;
            }

            return {
                id: result.id,
                author: result.author,
                content: result.content,
                createdAt: result.createdAt,
                likes: result.likes,
                postId: result.postId,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await Comment.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}
