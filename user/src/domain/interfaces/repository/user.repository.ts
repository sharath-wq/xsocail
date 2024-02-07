import { UserRequestModel, UserResponseModel } from '../../entities/user';

export interface UserRepository {
    createUser(user: UserRequestModel): Promise<UserResponseModel | null>;
    deleteUser(id: string): Promise<void>;
    updateUser(id: string, data: UserRequestModel): Promise<UserResponseModel | null>;
    getUsers(): Promise<UserResponseModel[] | []>;
    getUser(id: string): Promise<UserResponseModel | null>;
    getUserByEmail(email: string): Promise<UserResponseModel | null>;
    getUserByUsername(username: string): Promise<UserResponseModel | null>;
}
