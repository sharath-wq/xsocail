import { NotFoundError } from '@scxsocialcommon/errors';
import { NotificationUserModel } from '../../entities/user';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { GetUserFollowingUseCase } from '../../interfaces/use-cases/user';

export class GetUserFollowing implements GetUserFollowingUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(userId: string): Promise<NotificationUserModel[] | []> {
        const user = await this.UserRepository.getUser(userId);

        if (!user) {
            throw new NotFoundError();
        }

        const following = await this.UserRepository.getUserBatch(user.following);

        return following;
    }
}
