import { NotificationUserModel, UserResponseModel } from '../../entities/user';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { GetUserBatchUseCase } from '../../interfaces/use-cases/user/get-user-batch.use-case';

export class GetUserBatch implements GetUserBatchUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(userIds: string[]): Promise<NotificationUserModel[] | []> {
        return await this.UserRepository.getUserBatch(userIds);
    }
}
