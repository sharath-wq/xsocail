import { ReportRes, ReportUpdate } from '../../../entities/report';

export interface UpdateReportUseCase {
    execute(reportId: string, report: ReportUpdate): Promise<ReportRes | null>;
}
