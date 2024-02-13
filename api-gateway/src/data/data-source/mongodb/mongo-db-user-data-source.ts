import { UserModel } from '../../../domain/entities/user';
import { UserDataSource } from '../../interface/data-source/user-data-source';
import { User } from './schema/user';

export class MongoDBUserDataSource implements UserDataSource {
    async getOne(userId: string): Promise<UserModel | null> {
        try {
            const result = await User.findOne({ userId });

            if (result) {
                return result;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async create(user: UserModel): Promise<UserModel | null> {
        try {
            const newUser = await User.create(user);

            if (newUser) {
                return newUser;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(userId: string, data: UserModel): Promise<UserModel | null> {
        try {
            const updateResult = await User.findOneAndUpdate({ userId }, data);

            if (updateResult) {
                return updateResult;
            }

            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async delete(userId: string): Promise<void> {
        try {
            await User.findOneAndDelete({ userId });
        } catch (error) {
            console.log(error);
        }
    }
}
