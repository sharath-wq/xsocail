import { UserRepository } from '../../interfaces/repository/user.repository';
import { UnsavePostUseCase } from '../../interfaces/use-cases/user/unsave-post.use.case';

export class UnsavePost implements UnsavePostUseCase {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(postId: string, userId: string): Promise<void> {
        await this.userRepository.removeFromSaved(userId, postId);
    }
}
