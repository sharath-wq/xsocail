export interface IDislikeCommentUseCase {
    execute(id: string, userId: string): Promise<void>;
}
