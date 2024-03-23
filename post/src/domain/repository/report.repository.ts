import { IReportDataSource } from '../../data/interface/data-source/report-data-source';
import { IReportReq, IReportResponse, IReportUpdate } from '../entities/report';
import { IReportRepository } from '../interfaces/repository/report.repositor';

export class ReportRepository implements IReportRepository {
    reportDataSource: IReportDataSource;

    constructor(reportDataSource: IReportDataSource) {
        this.reportDataSource = reportDataSource;
    }
    async create(report: IReportReq): Promise<IReportResponse | null> {
        return this.reportDataSource.create(report);
    }
    async update(reportId: string, report: IReportUpdate): Promise<IReportResponse | null> {
        return this.reportDataSource.update(reportId, report);
    }
    async getOne(reportId: string): Promise<IReportResponse | null> {
        return this.reportDataSource.getOne(reportId);
    }
    async getAll(): Promise<[] | IReportResponse[]> {
        return this.reportDataSource.getAll();
    }
}
