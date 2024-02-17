import { UpdateUserRequstModel, UserModel, UserRequestModel, UserResponseModel } from '../../entities/user';

export interface UserRepository {
    createUser(user: UserRequestModel): Promise<UserResponseModel | null>;
    deleteUser(id: string): Promise<void>;
    updateUser(id: string, data: UpdateUserRequstModel): Promise<UserResponseModel | null>;
    getUsers(): Promise<UserResponseModel[] | []>;
    getUser(id: string): Promise<UserResponseModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    getUserByUsername(username: string): Promise<UserResponseModel | null>;
    updatePassword(userId: string, password: string): Promise<void>;
}
