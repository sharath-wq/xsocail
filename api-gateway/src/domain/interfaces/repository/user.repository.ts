import { UserModel } from '../../entities/user';

export interface UserRepository {
    createUser(user: UserModel): Promise<void>;
    deleteUser(userId: string): Promise<void>;
    updateUser(userId: string, data: UserModel): Promise<void>;
    getUser(userId: string): Promise<UserModel | null>;
}
