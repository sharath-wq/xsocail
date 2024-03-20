import { IReportReq, IReportResponse, IReportUpdate } from '../../../domain/entities/report';
import { IReportDataSource } from '../../interface/data-source/report-data-source';
import { Report } from './schema/report.schema';

export class MongoDBReportDataSource implements IReportDataSource {
    async create(report: IReportReq): Promise<IReportResponse | null> {
        try {
            const result = await Report.create(report);

            if (!result) {
                return null;
            }

            const { id, timestamp, postId, reporterId, reason, actionTaken } = result;

            return { id, timestamp, postId, reporterId, reason, actionTaken };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async update(reprotId: string, report: IReportUpdate): Promise<IReportResponse | null> {
        try {
            const result = await Report.findByIdAndUpdate(reprotId, report);

            if (!result) {
                return null;
            }

            const { id, timestamp, postId, reporterId, reason, actionTaken } = result;

            return { id, timestamp, postId, reporterId, reason, actionTaken };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getOne(reprotId: string): Promise<IReportResponse | null> {
        try {
            const result = await Report.findByIdAndUpdate(reprotId);

            if (!result) {
                return null;
            }

            const { id, timestamp, postId, reporterId, reason, actionTaken } = result;

            return { id, timestamp, postId, reporterId, reason, actionTaken };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getAll(): Promise<[] | IReportResponse[]> {
        try {
            const results = await Report.find({});

            return results.map((result) => {
                const { id, timestamp, postId, reporterId, reason, actionTaken } = result;

                return { id, timestamp, postId, reporterId, reason, actionTaken };
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
