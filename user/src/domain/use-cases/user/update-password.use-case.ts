import { UserRepository } from '../../interfaces/repository/user.repository';
import { UpdatePasswordUseCase } from '../../interfaces/use-cases/user/update-password.use-case';

export class UpdatePassword implements UpdatePasswordUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(userId: string, password: string): Promise<void> {
        await this.UserRepository.updatePassword(userId, password);
    }
}
