import { NotFoundError } from '@scxsocialcommon/errors';
import { ICommentRepository } from '../../interface/repository/comment.repository';
import { ILikeCommentUseCase } from '../../interface/use-case';

export class LikePost implements ILikeCommentUseCase {
    commentRepository: ICommentRepository;

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository;
    }

    async execute(id: string, userId: string): Promise<void> {
        const comment = await this.commentRepository.getById(id);

        if (!comment) {
            throw new NotFoundError();
        }

        if (!comment.likes.includes(userId)) {
            await this.commentRepository.like(id, userId);
        }
    }
}
