import { UserResponseModel, NotificationUserModel } from '../../../entities/user';

export interface GetUserFollowersUseCase {
    execute(userId: string): Promise<NotificationUserModel[] | []>;
}
