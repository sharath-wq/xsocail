import { ICommentResponseModel } from '../../entities/comment';
import { ICommentRepository } from '../../interface/repository/comment.repository';
import { IGetByPostIdUseCase } from '../../interface/use-case/get-by-postId.use-case';

export class GetByPostId implements IGetByPostIdUseCase {
    commentRepository: ICommentRepository;

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository;
    }

    async execute(postId: string): Promise<[] | ICommentResponseModel[]> {
        const results = await this.commentRepository.getByPostId(postId);
        return results;
    }
}
