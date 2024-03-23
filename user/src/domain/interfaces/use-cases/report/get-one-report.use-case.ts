import { ReportRes } from '../../../entities/report';

export interface GetOneReportsUseCase {
    execute(reportId: string): Promise<ReportRes | null>;
}
