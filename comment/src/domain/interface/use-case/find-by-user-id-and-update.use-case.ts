import { ICommentAuthorDetailsModel } from '../../entities/comment';

export interface FindByUserIdAndUpdateUseCase {
    execute(userId: string, data: ICommentAuthorDetailsModel): Promise<void>;
}
