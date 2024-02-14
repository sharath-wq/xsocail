import { UserModel } from '../../entities/user';

export interface DeleteUserUseCase {
    execute(userId: string, data: UserModel): Promise<void>;
}
