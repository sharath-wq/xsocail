import { UserResponseModel } from '../../../entities/user';

export interface GetUserFriendsUseCase {
    execute(userId: string): Promise<UserResponseModel[] | []>;
}
