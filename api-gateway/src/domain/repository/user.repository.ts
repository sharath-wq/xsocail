import { UserModel } from '../entities/user';
import { UserRepository } from '../interface/repository/user.repository';
import { UserDataSource } from '../../data/interface/data-source/user-data-source';

export class UserRepositoryImpl implements UserRepository {
    UserDataSource: UserDataSource;

    constructor(UserDataSource: UserDataSource) {
        this.UserDataSource = UserDataSource;
    }
    async getUserByEmail(email: string): Promise<UserModel | null> {
        const result = await this.UserDataSource.getUserByEmail(email);
        return result;
    }
    async createUser(user: UserModel): Promise<UserModel | null> {
        const result = await this.UserDataSource.create(user);
        return result;
    }

    async deleteUser(userId: string): Promise<void> {
        await this.UserDataSource.delete(userId);
    }

    async updateUser(userId: string, data: UserModel): Promise<UserModel | null> {
        const result = await this.UserDataSource.update(userId, data);
        return result;
    }
    async getUser(userId: string): Promise<UserModel | null> {
        return await this.UserDataSource.getOne(userId);
    }

    async getByUsername(username: string): Promise<UserModel | null> {
        const result = await this.UserDataSource.getByUsername(username);
        return result;
    }
}
