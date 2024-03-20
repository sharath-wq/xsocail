import { IReportResponse, IReportUpdate } from '../../entities/report';
import { IReportRepository } from '../../interfaces/repository/report.repositor';
import { IUpdateReportUseCase } from '../../interfaces/use-cases/report';

export class UpdateReport implements IUpdateReportUseCase {
    reportRepository: IReportRepository;

    constructor(reportRepository: IReportRepository) {
        this.reportRepository = reportRepository;
    }

    async execute(reporterId: string, report: IReportUpdate): Promise<IReportResponse | null> {
        return await this.reportRepository.update(reporterId, {
            ...report,
            timestamp: new Date(),
        });
    }
}
