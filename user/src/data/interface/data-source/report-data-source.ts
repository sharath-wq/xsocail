import { ReportReq, ReportRes, ReportUpdate } from '../../../domain/entities/report';

export interface ReportDataSource {
    create(report: ReportReq): Promise<ReportRes | null>;
    update(reportId: string, report: ReportUpdate): Promise<ReportRes | null>;
    getOne(reportId: string): Promise<ReportRes | null>;
    getAll(): Promise<ReportRes[] | []>;
}
