import { UserModel } from '../../../domain/entities/user';

export interface UserDataSource {
    getOne(userId: string): Promise<UserModel | null>;
    create(user: UserModel): Promise<void>;
    update(userId: string, data: UserModel): Promise<void>;
    delete(userId: string): Promise<void>;
}
