import { NotFoundError } from '@scxsocialcommon/errors';
import { ICommentRepository } from '../../interface/repository/comment.repository';
import { IDislikeCommentUseCase } from '../../interface/use-case';

export class DislikeComment implements IDislikeCommentUseCase {
    commentRepository: ICommentRepository;

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository;
    }

    async execute(id: string, userId: string): Promise<void> {
        const comment = await this.commentRepository.getById(id);

        if (!comment) {
            throw new NotFoundError();
        }

        const userIndex = comment.likes.indexOf(userId);

        if (userIndex !== -1) {
            await this.commentRepository.disLike(id, userIndex);
        }
    }
}
