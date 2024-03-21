import { ReportReq, ReportRes, ReportUpdate } from '../../entities/report';

export interface IReportRepository {
    create(report: ReportReq): Promise<ReportRes | null>;
    update(reportId: string, report: ReportUpdate): Promise<ReportRes | null>;
    getOne(reportId: string): Promise<ReportRes | null>;
    getAll(): Promise<ReportRes[] | []>;
}
