export interface LikePostUseCase {
    execute(userId: string, postId: string): Promise<void>;
}
