export interface UnfollowUserUseCase {
    execute(userId: string, followerId: string): Promise<void>;
}
