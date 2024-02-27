export interface ICommentDeleteUseCase {
    execute(id: string): Promise<void>;
}
