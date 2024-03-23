import { IReportResponse } from '../../entities/report';
import { IReportRepository } from '../../interfaces/repository/report.repositor';
import { IGetOneReportUseCase } from '../../interfaces/use-cases/report';

export class GetOneReport implements IGetOneReportUseCase {
    reportRepository: IReportRepository;

    constructor(reportRepository: IReportRepository) {
        this.reportRepository = reportRepository;
    }
    async execute(reporterId: string): Promise<IReportResponse | null> {
        return await this.reportRepository.getOne(reporterId);
    }
}
