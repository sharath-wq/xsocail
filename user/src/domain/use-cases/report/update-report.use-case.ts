import { ReportRes, ReportUpdate } from '../../entities/report';
import { UpdateReportUseCase } from '../../interfaces/use-cases/report/update-report.use-case';
import { ReportRepository } from '../../repository/report.repository';

export class UpdateReport implements UpdateReportUseCase {
    reportRepository: ReportRepository;

    constructor(reportRepository: ReportRepository) {
        this.reportRepository = reportRepository;
    }
    async execute(reportId: string, report: ReportUpdate): Promise<ReportRes | null> {
        return await this.reportRepository.update(reportId, report);
    }
}
