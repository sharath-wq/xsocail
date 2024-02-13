import { UserModel } from '../../entities/user';

export interface UserRepository {
    createUser(user: UserModel): Promise<UserModel | null>;
    deleteUser(userId: string): Promise<void>;
    updateUser(userId: string, data: UserModel): Promise<UserModel | null>;
    getUser(userId: string): Promise<UserModel | null>;
}
