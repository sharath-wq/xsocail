import { NotFoundError } from '@scxsocialcommon/errors';
import { NotificationUserModel } from '../../entities/user';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { GetUserFollowersUseCase } from '../../interfaces/use-cases/user';

export class GetUserFollowers implements GetUserFollowersUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(userId: string): Promise<NotificationUserModel[] | []> {
        const user = await this.UserRepository.getUser(userId);

        if (!user) {
            throw new NotFoundError();
        }

        console.log(user?.followers);
        const followers = await this.UserRepository.getUserBatch(user.followers);

        return followers;
    }
}
