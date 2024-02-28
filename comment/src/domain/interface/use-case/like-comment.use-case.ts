export interface ILikeCommentUseCase {
    execute(id: string, userId: string): Promise<void>;
}
