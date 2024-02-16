import { UserRequestModel, UserResponseModel } from '../../entities/user';
import { CretaeUserUseCase } from '../../interfaces/use-cases/user';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { BadRequestError } from '@scxsocialcommon/errors';

export class CreateUser implements CretaeUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(user: UserRequestModel): Promise<UserResponseModel | null> {
        const isExistingEmail = await this.UserRepository.getUserByEmail(user.email);

        if (isExistingEmail) {
            throw new BadRequestError('Email in Use');
        }

        const isExistingUsername = await this.UserRepository.getUserByUsername(user.username);

        if (isExistingUsername) {
            throw new BadRequestError('Username is already taken');
        }

        const result = this.UserRepository.createUser(user);
        return result;
    }
}
