import { UserRequestModel, UserResponseModel } from '../../entities/user';

export interface CretaeUserUseCase {
    execute(user: UserRequestModel): Promise<UserResponseModel | null>;
}
