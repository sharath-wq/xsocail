import { UserResponseModel } from '../../entities/user';

export interface GetUserUseCase {
    execute(id: string): Promise<UserResponseModel | null>;
}
