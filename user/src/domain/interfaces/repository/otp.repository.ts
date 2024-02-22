import { OtpRequestModel, OtpResponseModel } from '../../entities/otp';

export interface OtpReposiotry {
    createOtp(otp: OtpRequestModel): Promise<OtpResponseModel | null>;
    updateOtp(otpId: string, data: OtpRequestModel): Promise<OtpResponseModel | null>;
    deleteOtp(otpId: string): Promise<void>;
    getOtp(otpId: string): Promise<OtpResponseModel | null>;
    getOtpByEmail(email: string): Promise<OtpResponseModel | null>;
}
