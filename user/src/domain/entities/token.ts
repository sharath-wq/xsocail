export interface TokenModel {
    userId: string;
    token: string;
    createdAt: Date;
}

export interface TokenRequestModel {
    userId: string;
    token: string;
}
