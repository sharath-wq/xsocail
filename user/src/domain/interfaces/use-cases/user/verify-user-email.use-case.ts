export interface VerifyUserEmailUseCase {
    execute(email: string, otp: string): Promise<void>;
}
