export interface UserRequestModel {
    username: string;
    email: string;
    password: string;
    fullName: string;
    bio?: string;
    imageUrl?: string;
    gender?: 'male' | 'female';
    post: string;
    verified?: boolean;
}

export interface UpdateUserRequstModel {
    username?: string;
    email?: string;
    password?: string;
    fullName?: string;
    bio?: string;
    imageUrl?: string;
    gender?: 'male' | 'female';
    post?: string;
    verified?: boolean;
    isBlocked?: boolean;
    savedPosts?: string[];
    reportedBy?: string[];
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
    reportedBy: string[];
}

export interface NotificationUserModel {
    id: string;
    username: string;
    imageUrl: string;
    reportedBy: string[];
}

export interface UserModel {
    id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    bio: string;
    imageUrl: string;
    followers: string[];
    folowing: string[];
    savedPosts: string[];
    posts: string[];
    createdAt: Date;
    isAdmin: boolean;
    verified: boolean;
    reportedBy: string[];
}

export interface LoginResponseModel {
    userId: string;
    username: string;
    isAdmin: boolean;
    imageUrl: string;
}
