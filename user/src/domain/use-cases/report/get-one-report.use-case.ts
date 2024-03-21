import { ReportRes } from '../../entities/report';
import { GetOneReportsUseCase } from '../../interfaces/use-cases/report/get-one-report.use-case';
import { ReportRepository } from '../../repository/report.repository';

export class GetOneReport implements GetOneReportsUseCase {
    reportRepository: ReportRepository;

    constructor(reportRepository: ReportRepository) {
        this.reportRepository = reportRepository;
    }
    async execute(reportId: string): Promise<ReportRes | null> {
        return await this.reportRepository.getOne(reportId);
    }
}
