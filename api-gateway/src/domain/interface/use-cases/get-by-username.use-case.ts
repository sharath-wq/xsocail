import { UserModel } from '../../entities/user';

export interface GetByUsernameUseCase {
    execute(username: string): Promise<UserModel | null>;
}
