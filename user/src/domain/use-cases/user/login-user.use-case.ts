import { BadRequestError } from '@scxsocialcommon/errors';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { LoginUseCase } from '../../interfaces/use-cases/login.use-case';
import { Password } from '../../../utils/password';
import jwt from 'jsonwebtoken';
import { LoginResponseModel } from '../../entities/user';

export class Login implements LoginUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(email: string, password: string): Promise<LoginResponseModel | null> {
        const existingUser = await this.UserRepository.getUserByEmail(email);

        if (!existingUser) {
            throw new BadRequestError('Invalid Credentials');
        }

        const passwordMatch = await Password.compare(existingUser.password, password);

        if (!passwordMatch) {
            throw new BadRequestError('Invalid Credentialss');
        }

        return {
            userId: existingUser.id,
            isAdmin: existingUser.isAdmin,
            username: existingUser.username,
            imageUrl: existingUser.imageUrl,
        };
    }
}
