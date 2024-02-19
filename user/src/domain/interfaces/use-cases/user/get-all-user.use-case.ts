import { UserResponseModel } from '../../../entities/user';

export interface GetAllUserUseCase {
    execute(): Promise<UserResponseModel[] | []>;
}
