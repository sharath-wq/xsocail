import { UserRequestModel, UserResponseModel } from '../../entities/user';
import { CretaeUserUseCase } from '../../interfaces/use-cases';
import { UserRepository } from '../../interfaces/repository/user.repository';

export class CreateUser implements CretaeUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(user: UserRequestModel): Promise<UserResponseModel | null> {
        const result = this.UserRepository.createUser(user);
        return result;
    }
}
