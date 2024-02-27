import { ICommentRequestModel, ICommentResponseModel } from '../../entities/comment';
import { ICommentRepository } from '../../interface/repository/comment.repository';
import { ICreateCommentUseCase } from '../../interface/use-case/create-comment.use-case';

export class CreateComment implements ICreateCommentUseCase {
    commentRepository: ICommentRepository;

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository;
    }

    async execute(comment: ICommentRequestModel): Promise<ICommentResponseModel | null> {
        const newComment = await this.commentRepository.createComment(comment);
        return newComment;
    }
}
