import { BadRequestError, NotFoundError } from '@scxsocialcommon/errors';
import { TokenRepository } from '../../interfaces/repository/token.repository';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { ResetPasswordUseCase } from '../../interfaces/use-cases/token/reset-password.use-case';

export class ResetPassword implements ResetPasswordUseCase {
    tokenRepository: TokenRepository;
    userRepository: UserRepository;

    constructor(tokenRepository: TokenRepository, userRepository: UserRepository) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }
    async execute(password: string, userId: string, token: string): Promise<void> {
        const user = await this.userRepository.getUser(userId);

        if (!user) {
            throw new NotFoundError();
        }

        const existingToken = await this.tokenRepository.getTokenByUserIdAndToken(userId, token);

        if (!token) {
            throw new BadRequestError('Invalid Link or expired');
        }

        const updatedUser = await this.userRepository.updatePassword(userId, password);

        await this.tokenRepository.deleteTokenByUserIdAndToken(userId, token);
    }
}
