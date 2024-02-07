import { UserModel } from '../../entities/user';

export interface UpdateUserUseCase {
    execute(userId: string, data: UserModel): Promise<void>;
}
