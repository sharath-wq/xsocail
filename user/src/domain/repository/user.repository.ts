import {
    NotificationUserModel,
    UpdateUserRequstModel,
    UserModel,
    UserRequestModel,
    UserResponseModel,
} from '../entities/user';
import { UserRepository } from '../interfaces/repository/user.repository';
import { UserDataSource } from '../../data/interface/data-source/user-data-source';

export class UserRepositoryImpl implements UserRepository {
    UserDataSource: UserDataSource;

    constructor(UserDataSource: UserDataSource) {
        this.UserDataSource = UserDataSource;
    }

    async getUserBatch(userIds: string[]): Promise<NotificationUserModel[] | []> {
        return await this.UserDataSource.getUserBatch(userIds);
    }

    async getUserFriends(userId: string): Promise<[] | UserResponseModel[]> {
        return await this.UserDataSource.getUserFriends(userId);
    }

    async follow(userId: string, followerId: string): Promise<void> {
        await this.UserDataSource.follow(userId, followerId);
    }

    async unFollow(userId: string, followerId: string): Promise<void> {
        await this.UserDataSource.unFollow(userId, followerId);
    }

    async addToSaved(userId: string, postId: string): Promise<void> {
        await this.UserDataSource.addToSaved(userId, postId);
    }

    async removeFromSaved(userId: string, postId: string): Promise<void> {
        await this.UserDataSource.removeFromSaved(userId, postId);
    }

    async updateUserProfileImage(userId: string, imageUrl: string): Promise<UserResponseModel | null> {
        const result = await this.UserDataSource.updateProfileImage(userId, imageUrl);
        return result;
    }
    async deletePost(userId: string, postId: string): Promise<void> {
        const result = await this.UserDataSource.deletePost(userId, postId);
    }
    async addPost(userId: string, postId: string): Promise<void> {
        const result = await this.UserDataSource.addPost(userId, postId);
    }

    async updatePassword(userId: string, password: string): Promise<void> {
        const result = await this.UserDataSource.updatePassword(userId, password);
    }

    async createUser(user: UserRequestModel): Promise<UserResponseModel | null> {
        const result = await this.UserDataSource.create(user);
        return result;
    }

    async deleteUser(id: string): Promise<void> {
        await this.UserDataSource.deleteOne(id);
    }

    async updateUser(id: string, data: UpdateUserRequstModel): Promise<UserResponseModel | null> {
        const result = await this.UserDataSource.updateOne(id, data);
        return result;
    }

    async getAll(): Promise<UserResponseModel[] | []> {
        const result = await this.UserDataSource.getAll();
        return result;
    }

    async getSuggested(query: string): Promise<UserResponseModel[] | []> {
        const result = await this.UserDataSource.getSuggested(query);
        return result;
    }

    async getUser(id: string): Promise<UserResponseModel | null> {
        const result = await this.UserDataSource.getOne(id);
        return result;
    }

    async getUserByEmail(email: string): Promise<UserModel | null> {
        const result = await this.UserDataSource.findByEmail(email);
        return result;
    }

    async getUserByUsername(username: string): Promise<UserResponseModel | null> {
        const result = await this.UserDataSource.findByUsername(username);
        return result;
    }
}
