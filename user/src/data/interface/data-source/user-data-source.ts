import { UserModel, UserRequestModel, UserResponseModel } from '../../../domain/entities/user';

export interface UserDataSource {
    create(user: UserRequestModel): Promise<UserResponseModel | null>;
    getAll(): Promise<UserResponseModel[]>;
    deleteOne(id: string): Promise<void>;
    updateOne(id: string, user: UserRequestModel): Promise<UserResponseModel | null>;
    getOne(id: string): Promise<UserResponseModel | null>;
    findByEmail(email: string): Promise<UserModel | null>;
    findByUsername(username: string): Promise<UserResponseModel | null>;
}
