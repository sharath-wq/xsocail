import { ReportReq, ReportRes, ReportUpdate } from '../../../domain/entities/report';
import { ReportDataSource } from '../../interface/data-source/report-data-source';
import { Report } from './schema/report.schema';

export class MongoDBReportDatasource implements ReportDataSource {
    async create(report: ReportReq): Promise<ReportRes | null> {
        try {
            const result = await Report.create(report);

            if (!result) {
                return null;
            }

            const { id, timestamp, userId, reporterId, reason, actionTaken } = result;

            return {
                id,
                timestamp,
                userId,
                reporterId,
                reason,
                actionTaken,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async update(reportId: string, report: ReportUpdate): Promise<ReportRes | null> {
        try {
            const result = await Report.findByIdAndUpdate(reportId, report);

            if (!result) {
                return null;
            }

            const { id, timestamp, userId, reporterId, reason, actionTaken } = result;

            return {
                id,
                timestamp,
                userId,
                reporterId,
                reason,
                actionTaken,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getOne(reportId: string): Promise<ReportRes | null> {
        try {
            const result = await Report.findById(reportId);

            if (!result) {
                return null;
            }

            const { id, timestamp, userId, reporterId, reason, actionTaken } = result;

            return {
                id,
                timestamp,
                userId,
                reporterId,
                reason,
                actionTaken,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getAll(): Promise<[] | ReportRes[]> {
        try {
            const results = await Report.find({ actionTaken: { $ne: 'Account Blocked' } });
            return results.map((result) => {
                const { id, timestamp, userId, reporterId, reason, actionTaken } = result;
                return {
                    id,
                    timestamp,
                    userId,
                    reporterId,
                    reason,
                    actionTaken,
                };
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
