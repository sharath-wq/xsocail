import { NotificationUserModel, UserResponseModel } from '../../../entities/user';

export interface GetUserBatchUseCase {
    execute(userIds: string[]): Promise<NotificationUserModel[] | []>;
}
