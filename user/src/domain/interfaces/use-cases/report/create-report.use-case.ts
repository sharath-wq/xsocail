import { ReportReq, ReportRes } from '../../../entities/report';

export interface CreateReportUseCase {
    execute(report: ReportReq): Promise<ReportRes | null>;
}
