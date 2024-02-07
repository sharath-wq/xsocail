import { UserModel } from '../../../domain/entities/user';
import { UserDataSource } from '../../interfaces/data-source/user-data-source';
import { User } from './Schema/user.schema';

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
            return null;
            console.log(error);
        }
    }
    async create(user: UserModel): Promise<void> {
        try {
            await User.create(user);
        } catch (error) {
            console.log(error);
        }
    }

    async update(userId: string, data: UserModel): Promise<void> {
        try {
            await User.updateOne({ userId }, data);
        } catch (error) {
            console.log(error);
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
