import { UserModel } from '../entities/user';
import { UserRepository } from '../interface/repository/user.repository';
import { CreateUserUseCase } from '../interface/use-cases/create-user.use-case';

export class CreateUser implements CreateUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(user: UserModel): Promise<UserModel | null> {
        const result = await this.UserRepository.createUser(user);

        if (result) {
            return result;
        } else {
            return null;
        }
    }
}
