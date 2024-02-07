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
    imageUrl?: string;
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
