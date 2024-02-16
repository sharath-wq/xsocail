import { TokenRepository } from '../../interfaces/repository/token.repository';
import { ResetPasswordUseCase } from '../../interfaces/use-cases/token/reset-password.use-case';

export class ResetPassword implements ResetPasswordUseCase {
    tokenRepository: TokenRepository;

    constructor(tokenRepository: TokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    execute(password: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
