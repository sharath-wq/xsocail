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
