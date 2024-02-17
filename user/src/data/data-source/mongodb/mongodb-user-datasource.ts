import { UpdateUserRequstModel, UserModel, UserRequestModel, UserResponseModel } from '../../../domain/entities/user';
import { UserDataSource } from '../../interface/data-source/user-data-source';
import { User } from './schema/user.schema';

export class MongoDBUserDataSource implements UserDataSource {
    async updatePassword(id: string, password: string): Promise<void> {
        try {
            const existingUser = await User.findById(id);

            if (existingUser) {
                existingUser.password = password;
                await existingUser.save();
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getAll(): Promise<UserResponseModel[]> {
        try {
            const results = await User.find();

            return results.map((item) => ({
                id: item.id,
                username: item.username,
                email: item.email,
                fullName: item.fullName,
                createdAt: item.createdAt,
                isAdmin: item.isAdmin,
                imageUrl: item.imageUrl,
            }));
        } catch (error: any) {
            console.log('Error Finding User');
            return [];
        }
    }

    async create(user: UserRequestModel): Promise<UserResponseModel | null> {
        try {
            const result = await User.create(user);
            if (result) {
                return {
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    fullName: result.fullName,
                    createdAt: result.createdAt,
                    isAdmin: result.isAdmin,
                    imageUrl: result.imageUrl,
                };
            } else {
                return null;
            }
        } catch (error: any) {
            console.log(error);

            console.log('Error Creating User');
            return null;
        }
    }

    async deleteOne(id: string): Promise<void> {
        await User.findByIdAndDelete(id);
    }

    async updateOne(id: string, user: UpdateUserRequstModel): Promise<UserResponseModel | null> {
        try {
            const existingUser = await User.findByIdAndUpdate(id, user);

            if (existingUser) {
                return {
                    id: existingUser.id,
                    username: existingUser.username,
                    email: existingUser.email,
                    fullName: existingUser.fullName,
                    createdAt: existingUser.createdAt,
                    isAdmin: existingUser.isAdmin,
                    imageUrl: existingUser.imageUrl,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error Creating User');
            return null;
        }
    }
    async getOne(id: string): Promise<UserResponseModel | null> {
        try {
            const result = await User.findById(id);

            if (result) {
                return {
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    fullName: result.fullName,
                    createdAt: result.createdAt,
                    isAdmin: result.isAdmin,
                    imageUrl: result.imageUrl,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.log('Cant find User');
            return null;
        }
    }

    async findByEmail(email: string): Promise<UserModel | null> {
        try {
            const result = await User.findOne({ email: email });

            if (result) {
                return {
                    id: result.id,
                    createdAt: result.createdAt,
                    email: result.email,
                    fullName: result.fullName,
                    isAdmin: result.isAdmin,
                    password: result.password,
                    username: result.username,
                    imageUrl: result.imageUrl,
                };
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    async findByUsername(username: string): Promise<UserResponseModel | null> {
        try {
            const result = await User.findOne({ username: username });

            if (result) {
                return {
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    fullName: result.fullName,
                    createdAt: result.createdAt,
                    isAdmin: result.isAdmin,
                    imageUrl: result.imageUrl,
                };
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
}
