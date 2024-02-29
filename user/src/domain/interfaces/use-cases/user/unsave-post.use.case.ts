export interface UnsavePostUseCase {
    execute(postId: string, userId: string): Promise<void>;
}
