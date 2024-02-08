import { UserModel } from '../entities/user';
import { UserRepository } from '../interfaces/repository/user.repository';
import { UpdateUserUseCase } from '../interfaces/use-cases/update-user.use-case';

export class UpdateUser implements UpdateUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(userId: string, data: UserModel): Promise<void> {
        await this.UserRepository.updateUser(userId, data);
    }
}
