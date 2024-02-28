export interface SavePostUseCase {
    execute(postId: string, userId: string): Promise<void>;
}
