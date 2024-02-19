export interface UserRequestModel {
    username: string;
    email: string;
    password: string;
    fullName: string;
    bio?: string;
    imageUrl?: string;
    gender?: 'male' | 'female';
    post: string;
}

export interface UpdateUserRequstModel {
    username?: string;
    email?: string;
    password?: string;
    fullName?: string;
    bio?: string;
    imageUrl?: string;
    gender?: 'male' | 'female';
    post: string;
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
}

export interface LoginResponseModel {
    userId: string;
    username: string;
    isAdmin: boolean;
    imageUrl: string;
}
