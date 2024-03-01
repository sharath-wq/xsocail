import { ICommentAuthorDetailsModel } from '../../entities/comment';
import { ICommentRepository } from '../../interface/repository/comment.repository';
import { FindByUserIdAndUpdateUseCase } from '../../interface/use-case';

export class FindByUserIdAndUpdate implements FindByUserIdAndUpdateUseCase {
    commentRepository: ICommentRepository;

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository;
    }

    async execute(userId: string, data: ICommentAuthorDetailsModel): Promise<void> {
        await this.commentRepository.findByUserIdAndUpdate(userId, data);
    }
}
