import { UserResponseModel } from '../../../entities/user';

export interface GetAllUserUseCase {
    execute(query: string): Promise<UserResponseModel[] | []>;
}
