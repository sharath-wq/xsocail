import { UserModel } from '../entities/user';
import { UserRepository } from '../interfaces/repository/user.repository';
import { CreateUserUseCase } from '../interfaces/use-cases/create-user.use-case';

export class createUser implements CreateUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(user: UserModel): Promise<void> {
        await this.UserRepository.createUser(user);
    }
}
