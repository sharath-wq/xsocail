export interface DeletePostUseCase {
    execute(userId: string, postId: string): Promise<void>;
}
