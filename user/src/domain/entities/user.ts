export interface UserRequestModel {
    username: string;
    email: string;
    password: string;
    fullName: string;
    bio?: string;
    imageUrl?: string;
    gender?: 'male' | 'female';
}

export interface UserResponseModel {
    id: string;
    username: string;
    email: string;
    fullName: string;
    bio?: string;
    imageUrl: string;
    gender?: 'male' | 'female';
    trackers?: string[];
    tracking?: string[];
    savedPosts?: string[];
    createdAt: Date;
    settings?: {
        privacy: 'public' | 'private';
        theme: 'dark' | 'light';
    };
    isAdmin: boolean;
}

export interface UserModel {
    id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    bio?: string;
    imageUrl: string;
    gender?: 'male' | 'female';
    trackers?: string[];
    tracking?: string[];
    savedPosts?: string[];
    createdAt: Date;
    settings?: {
        privacy: 'public' | 'private';
        theme: 'dark' | 'light';
    };
    isAdmin: boolean;
}

export interface LoginResponseModel {
    userId: string;
    username: string;
    isAdmin: boolean;
    imageUrl: string;
}
