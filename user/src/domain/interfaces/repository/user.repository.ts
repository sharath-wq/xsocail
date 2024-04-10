import {
    NotificationUserModel,
    UpdateUserRequstModel,
    UserModel,
    UserRequestModel,
    UserResponseModel,
} from '../../entities/user';

export interface UserRepository {
    createUser(user: UserRequestModel): Promise<UserResponseModel | null>;
    deleteUser(id: string): Promise<void>;
    updateUser(id: string, data: UpdateUserRequstModel): Promise<UserResponseModel | null>;
    getSuggested(query: string): Promise<UserResponseModel[] | []>;
    getAll(): Promise<UserResponseModel[] | []>;
    getUser(id: string): Promise<UserResponseModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    getUserByUsername(username: string): Promise<UserResponseModel | null>;
    updatePassword(userId: string, password: string): Promise<void>;
    addPost(userId: string, postId: string): Promise<void>;
    deletePost(userId: string, postId: string): Promise<void>;
    updateUserProfileImage(userId: string, imageUrl: string): Promise<UserResponseModel | null>;
    addToSaved(userId: string, postId: string): Promise<void>;
    removeFromSaved(userId: string, postId: string): Promise<void>;
    follow(userId: string, followerId: string): Promise<void>;
    unFollow(userId: string, followerId: string): Promise<void>;
    getUserFriends(userId: string): Promise<UserResponseModel[] | []>;
    getUserBatch(userIds: string[]): Promise<NotificationUserModel[] | []>;
}
