export interface SendVerificationOtpUseCase {
    execute(email: string): Promise<void>;
}
