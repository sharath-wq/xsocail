export interface UserModel {
    userId: string;
    email: string;
    username: string;
    isAdmin: boolean;
    imageUrl: string;
}

export interface UserRequestModel {
    username: string;
    email: string;
    fullName: string;
    imageUrl: string;
    password: string;
}

export interface UserResponseModel {
    id: string;
    username: string;
    email: string;
    fullName: string;
    bio: string;
    imageUrl: string;
    followers: string[];
    following: string[];
    savedPosts: string[];
    posts: string[];
    createdAt: Date;
    isAdmin: boolean;
    verified: boolean;
    isBlocked: boolean;
}
