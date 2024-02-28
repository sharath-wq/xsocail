import { BadRequestError } from '@scxsocialcommon/errors';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { FollowUserUseCase } from '../../interfaces/use-cases/user';

export class FollowUser implements FollowUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(userId: string, followerId: string): Promise<void> {
        if (userId === followerId) {
            throw new BadRequestError("You can't follow Your self.");
        }

        await this.UserRepository.follow(userId, followerId);
    }
}
