import { UserModel } from '../../entities/user';

export interface CreateUserUseCase {
    execute(user: UserModel): Promise<void>;
}
