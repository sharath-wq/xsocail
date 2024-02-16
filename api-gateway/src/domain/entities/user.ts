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
