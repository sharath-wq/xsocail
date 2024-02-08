import { UserModel } from '../entities/user';
import { UserRepository } from '../interfaces/repository/user.repository';
import { DeleteUserUseCase } from '../interfaces/use-cases/delete-user.use-case';

export class DeleteUser implements DeleteUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(userId: string, data: UserModel): Promise<void> {
        await this.UserRepository.deleteUser(userId);
    }
}
