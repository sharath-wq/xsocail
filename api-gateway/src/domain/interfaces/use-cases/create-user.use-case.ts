import { UserModel } from '../../entities/user';

export interface CreateUserUseCase {
    execute(user: UserModel): Promise<UserModel | null>;
}
