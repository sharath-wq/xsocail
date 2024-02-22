import { OtpModel, OtpRequestModel, OtpResponseModel } from '../../../domain/entities/otp';

export interface OtpDataSource {
    create(otp: OtpRequestModel): Promise<OtpResponseModel | null>;
    update(id: string, data: OtpRequestModel): Promise<OtpResponseModel | null>;
    delete(id: string): Promise<void>;
    get(id: string): Promise<OtpResponseModel | null>;
    getByUserEmail(email: string): Promise<OtpResponseModel | null>;
}
