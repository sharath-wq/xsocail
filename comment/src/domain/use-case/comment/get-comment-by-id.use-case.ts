import { NotFoundError } from '@scxsocialcommon/errors';
import { ICommentResponseModel } from '../../entities/comment';
import { ICommentRepository } from '../../interface/repository/comment.repository';
import { IGetCommentByIdUseCase } from '../../interface/use-case';

export class GetCommentById implements IGetCommentByIdUseCase {
    commentRepository: ICommentRepository;

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository;
    }

    async execute(id: string): Promise<ICommentResponseModel | null> {
        const comment = await this.commentRepository.getById(id);

        if (!comment) {
            throw new NotFoundError();
        }

        return comment;
    }
}
