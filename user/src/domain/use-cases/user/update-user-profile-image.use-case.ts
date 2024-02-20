import { UserResponseModel } from '../../entities/user';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { UpdateUserProfileImageUseCase } from '../../interfaces/use-cases/user';
import { UpdatePasswordUseCase } from '../../interfaces/use-cases/user/update-password.use-case';

export class UpdateUserProfile implements UpdateUserProfileImageUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(userId: string, imageUrl: string): Promise<UserResponseModel | null> {
        const result = await this.UserRepository.updateUserProfileImage(userId, imageUrl);
        return result;
    }
}
