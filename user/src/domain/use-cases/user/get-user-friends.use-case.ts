import { UserResponseModel } from '../../entities/user';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { GetUserFriendsUseCase } from '../../interfaces/use-cases/user/get-user-friends.use-case';

export class GetUserFriends implements GetUserFriendsUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(userId: string): Promise<UserResponseModel[] | []> {
        return await this.UserRepository.getUserFriends(userId);
    }
}
