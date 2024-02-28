export interface FollowUserUseCase {
    execute(userId: string, followerId: string): Promise<void>;
}
