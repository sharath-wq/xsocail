import { UserModel } from '../../entities/user';

export interface GetUserByEmailUseCase {
    execute(email: string): Promise<UserModel | null>;
}
