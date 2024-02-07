import { DeleteUserUseCase } from '../../interfaces/use-cases';
import { UserRepository } from '../../interfaces/repository/user.repository';

export class DeleteUser implements DeleteUserUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(id: string): Promise<void> {
        await this.UserRepository.deleteUser(id);
    }
}
