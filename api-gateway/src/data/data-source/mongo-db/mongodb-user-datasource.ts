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
    async create(user: UserModel): Promise<UserModel | null> {
        try {
            const newUser = await User.create(user);

            if (newUser) {
                return {
                    userId: user.userId,
                    username: user.username,
                    isAdmin: user.isAdmin,
                };
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
            const updateResult = await User.updateOne({ userId }, data);

            if (updateResult) {
                const updatedUser = await User.findOne({ userId });

                if (updatedUser) {
                    return {
                        userId: updatedUser.userId,
                        username: updatedUser.username,
                        isAdmin: updatedUser.isAdmin,
                    };
                }
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
