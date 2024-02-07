import { UserRequestModel, UserResponseModel } from '../../entities/user';

export interface UpdateUserUseCase {
    execute(id: string, data: UserRequestModel): Promise<UserResponseModel | null>;
}
