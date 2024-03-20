import { IReportReq, IReportResponse, IReportUpdate } from '../../entities/report';

export interface IReportRepository {
    create(report: IReportReq): Promise<IReportResponse | null>;
    update(reportId: string, report: IReportUpdate): Promise<IReportResponse | null>;
    getOne(reportId: string): Promise<IReportResponse | null>;
    getAll(): Promise<IReportResponse[] | []>;
}
