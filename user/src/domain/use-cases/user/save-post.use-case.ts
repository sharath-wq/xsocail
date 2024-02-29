import { NotFoundError } from '@scxsocialcommon/errors';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { SavePostUseCase } from '../../interfaces/use-cases/user/save-post.use-case';

export class SavePost implements SavePostUseCase {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(postId: string, userId: string): Promise<void> {
        await this.userRepository.addToSaved(userId, postId);
    }
}
