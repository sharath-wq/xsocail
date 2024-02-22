import { OtpDataSource } from '../../data/interface/data-source/otp-data-source';
import { OtpRequestModel, OtpResponseModel } from '../entities/otp';
import { OtpReposiotry } from '../interfaces/repository/otp.repository';

export class OtpReposiotryImpl implements OtpReposiotry {
    otpDataSource: OtpDataSource;

    constructor(otpDataSource: OtpDataSource) {
        this.otpDataSource = otpDataSource;
    }

    async createOtp(otp: OtpRequestModel): Promise<OtpResponseModel | null> {
        const result = await this.otpDataSource.create(otp);
        return result;
    }

    async updateOtp(otpId: string, data: OtpRequestModel): Promise<OtpResponseModel | null> {
        const result = await this.otpDataSource.update(otpId, data);
        return result;
    }

    async deleteOtp(otpId: string): Promise<void> {
        await this.otpDataSource.delete(otpId);
    }

    async getOtp(otpId: string): Promise<OtpResponseModel | null> {
        const result = await this.otpDataSource.get(otpId);
        return result;
    }

    async getOtpByEmail(email: string): Promise<OtpResponseModel | null> {
        const result = await this.otpDataSource.getByUserEmail(email);
        return result;
    }
}
