export interface OtpModel {
    email: string;
    otp: string;
    createdAt: string;
}

export interface OtpRequestModel {
    email: string;
    otp: string;
}

export interface OtpResponseModel {
    id: string;
    email: string;
    otp: string;
    createdAt: Date;
}
