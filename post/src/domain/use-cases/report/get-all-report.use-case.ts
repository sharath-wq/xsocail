import { IReportResponse } from '../../entities/report';
import { IReportRepository } from '../../interfaces/repository/report.repositor';
import { IGetAllReportUseCase } from '../../interfaces/use-cases/report';

export class GetAllReport implements IGetAllReportUseCase {
    reportRepository: IReportRepository;

    constructor(reportRepository: IReportRepository) {
        this.reportRepository = reportRepository;
    }
    async execute(): Promise<[] | IReportResponse[]> {
        return await this.reportRepository.getAll();
    }
}
