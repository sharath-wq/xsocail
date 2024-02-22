import { OtpRequestModel, OtpResponseModel } from '../../../domain/entities/otp';
import { OtpDataSource } from '../../interface/data-source/otp-data-source';
import { Otp } from './schema/otp.schema';

export class MongoDBOtpDatasource implements OtpDataSource {
    async create(otp: OtpRequestModel): Promise<OtpResponseModel | null> {
        try {
            const result = await Otp.create(otp);
            if (result) {
                return {
                    id: result.id,
                    createdAt: result.createdAt,
                    email: result.email,
                    otp: result.otp,
                };
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(id: string, data: OtpRequestModel): Promise<OtpResponseModel | null> {
        try {
            const result = await Otp.findByIdAndUpdate(id, data);
            if (result) {
                return {
                    id: result.id,
                    createdAt: result.createdAt,
                    email: result.email,
                    otp: result.otp,
                };
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await Otp.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    async get(id: string): Promise<OtpResponseModel | null> {
        try {
            const result = await Otp.findById(id);
            if (result) {
                return {
                    id: result.id,
                    createdAt: result.createdAt,
                    email: result.email,
                    otp: result.otp,
                };
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getByUserEmail(email: string): Promise<OtpResponseModel | null> {
        try {
            const result = await Otp.findOne({ email });
            if (result) {
                return {
                    id: result.id,
                    createdAt: result.createdAt,
                    email: result.email,
                    otp: result.otp,
                };
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
