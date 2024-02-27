import { ICommentRepository } from '../../interface/repository/comment.repository';
import { ICommentDeleteUseCase } from '../../interface/use-case/delete-comment.use-case';

export class DeleteComment implements ICommentDeleteUseCase {
    commentRepository: ICommentRepository;

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository;
    }

    async execute(id: string): Promise<void> {
        await this.commentRepository.deleteComment(id);
    }
}
