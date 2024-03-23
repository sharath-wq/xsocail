export interface DisLikePostUseCase {
    execute(userId: string, postId: string): Promise<void>;
}
