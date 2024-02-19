export interface ResetPasswordUseCase {
    execute(password: string, userId: string, token: string): Promise<void>;
}
