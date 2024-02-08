import { UserModel } from '../../entities/user';

export interface GetUserUseCase {
    execute(userId: string): Promise<UserModel | null>;
}
