export interface AddPostUseCase {
    execute(userId: string, postId: string): Promise<void>;
}
