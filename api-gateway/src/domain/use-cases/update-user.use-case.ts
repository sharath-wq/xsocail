import { UserModel } from '../entities/user';
import { UserRepository } from '../interfaces/repository/user.repository';
import { UpdateUserUseCase } from '../interfaces/use-cases/update-user.use-case';

export class UpdateUser implements UpdateUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(userId: string, data: UserModel): Promise<UserModel | null> {
        const result = await this.UserRepository.updateUser(userId, data);
        return result;
    }
}
