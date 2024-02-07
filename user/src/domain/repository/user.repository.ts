import { UserRequestModel, UserResponseModel } from '../entities/user';
import { UserRepository } from '../interfaces/repository/user.repository';
import { UserDataSource } from '../../data/interface/data-source/user-data-source';

export class UserRepositoryImpl implements UserRepository {
    UserDataSource: UserDataSource;

    constructor(UserDataSource: UserDataSource) {
        this.UserDataSource = UserDataSource;
    }

    async createUser(user: UserRequestModel): Promise<UserResponseModel | null> {
        const result = await this.UserDataSource.create(user);
        return result;
    }

    async deleteUser(id: string): Promise<void> {
        await this.UserDataSource.deleteOne(id);
    }

    async updateUser(id: string, data: UserRequestModel): Promise<UserResponseModel | null> {
        const result = await this.UserDataSource.updateOne(id, data);
        return result;
    }

    async getUsers(): Promise<UserResponseModel[] | []> {
        const result = await this.UserDataSource.getAll();
        return result;
    }

    async getUser(id: string): Promise<UserResponseModel | null> {
        const result = await this.UserDataSource.getOne(id);
        return result;
    }
}
