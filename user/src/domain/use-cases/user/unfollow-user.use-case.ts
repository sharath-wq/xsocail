import { UserRepository } from '../../interfaces/repository/user.repository';
import { UnfollowUserUseCase } from '../../interfaces/use-cases/user';

export class UnfollowUser implements UnfollowUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(userId: string, followerId: string): Promise<void> {
        await this.UserRepository.unFollow(userId, followerId);
    }
}
