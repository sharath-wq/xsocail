export interface SendResetTokenUseCase {
    execute(email: string): Promise<void>;
}
