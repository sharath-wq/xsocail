export interface ResetPasswordUseCase {
    execute(password: string): Promise<void>;
}
