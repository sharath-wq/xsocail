import { AxiosError } from 'axios';

export interface User {
    userId: string;
    isAdmin: boolean;
    username: string;
    iat: number;
}

export interface GetUserResult {
    currentUser: User | null;
    error: AxiosError | null;
}

export type UserData = {
    createdAt: string;
    email: string;
    fullName: string;
    id: string;
    imageUrl: string;
    isAdmin: boolean;
    username: string;
    following: [];
    followers: [];
    posts: [];
    bio: string;
};
