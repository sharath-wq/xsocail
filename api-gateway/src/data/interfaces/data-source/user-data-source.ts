import { UserModel } from '../../../domain/entities/user';

export interface UserDataSource {
    getOne(userId: string): Promise<UserModel | null>;
    create(user: UserModel): Promise<UserModel | null>;
    update(userId: string, data: UserModel): Promise<UserModel | null>;
    delete(userId: string): Promise<void>;
}
