import {
    NotificationUserModel,
    UpdateUserRequstModel,
    UserModel,
    UserRequestModel,
    UserResponseModel,
} from '../../../domain/entities/user';

export interface UserDataSource {
    create(user: UserRequestModel): Promise<UserResponseModel | null>;
    getSuggested(query: string): Promise<UserResponseModel[]>;
    getAll(): Promise<UserResponseModel[] | []>;
    deleteOne(id: string): Promise<void>;
    updateOne(id: string, user: UpdateUserRequstModel): Promise<UserResponseModel | null>;
    getOne(id: string): Promise<UserResponseModel | null>;
    findByEmail(email: string): Promise<UserModel | null>;
    findByUsername(username: string): Promise<UserResponseModel | null>;
    updatePassword(id: string, password: string): Promise<void>;
    addPost(userId: string, postId: string): Promise<void>;
    deletePost(userId: string, postId: string): Promise<void>;
    updateProfileImage(userId: string, postId: string): Promise<UserResponseModel | null>;
    addToSaved(userId: string, postId: string): Promise<void>;
    removeFromSaved(userId: string, postId: string): Promise<void>;
    follow(userId: string, followerId: string): Promise<void>;
    unFollow(userId: string, followerId: string): Promise<void>;
    getUserFriends(userId: string): Promise<UserResponseModel[] | []>;
    getUserBatch(userIds: string[]): Promise<NotificationUserModel[] | []>;
}
