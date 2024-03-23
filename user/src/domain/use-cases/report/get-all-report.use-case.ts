import { ReportRes } from '../../entities/report';
import { GetAllReportsUseCase } from '../../interfaces/use-cases/report/get-all-report.use-case';
import { ReportRepository } from '../../repository/report.repository';

export class GetAllReports implements GetAllReportsUseCase {
    reportRepository: ReportRepository;

    constructor(reportRepository: ReportRepository) {
        this.reportRepository = reportRepository;
    }
    async execute(): Promise<[] | ReportRes[]> {
        return await this.reportRepository.getAll();
    }
}
