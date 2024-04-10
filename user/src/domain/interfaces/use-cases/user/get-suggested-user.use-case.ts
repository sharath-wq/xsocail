import { UserResponseModel } from '../../../entities/user';

export interface GetSuggestedUsersUseCase {
    execute(query: string): Promise<UserResponseModel[] | []>;
}
