import { NotificationUserModel } from '../../../entities/user';

export interface GetUserFollowingUseCase {
    execute(userId: string): Promise<NotificationUserModel[] | []>;
}
