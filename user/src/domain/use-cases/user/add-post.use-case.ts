import { AddPostUseCase } from '../../interfaces/use-cases/user';
import { UserRepository } from '../../interfaces/repository/user.repository';

export class AddPost implements AddPostUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(userId: string, postId: string): Promise<void> {
        await this.UserRepository.addPost(userId, postId);
    }
}
