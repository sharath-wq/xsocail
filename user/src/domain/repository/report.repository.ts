import { ReportDataSource } from '../../data/interface/data-source/report-data-source';
import { ReportReq, ReportRes, ReportUpdate } from '../entities/report';
import { IReportRepository } from '../interfaces/repository/report.repository';

export class ReportRepository implements IReportRepository {
    reportDataSource: ReportDataSource;

    constructor(reportDataSource: ReportDataSource) {
        this.reportDataSource = reportDataSource;
    }

    async create(report: ReportReq): Promise<ReportRes | null> {
        return await this.reportDataSource.create(report);
    }
    async update(reportId: string, report: ReportUpdate): Promise<ReportRes | null> {
        return await this.reportDataSource.update(reportId, report);
    }
    async getOne(reportId: string): Promise<ReportRes | null> {
        return await this.reportDataSource.getOne(reportId);
    }
    async getAll(): Promise<[] | ReportRes[]> {
        return await this.reportDataSource.getAll();
    }
}
