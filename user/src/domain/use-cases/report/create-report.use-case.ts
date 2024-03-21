import { ReportReq, ReportRes } from '../../entities/report';
import { CreateReportUseCase } from '../../interfaces/use-cases/report/create-report.use-case';
import { ReportRepository } from '../../repository/report.repository';

export class CreateReport implements CreateReportUseCase {
    reportRepository: ReportRepository;

    constructor(reportRepository: ReportRepository) {
        this.reportRepository = reportRepository;
    }

    async execute(report: ReportReq): Promise<ReportRes | null> {
        return await this.reportRepository.create(report);
    }
}
