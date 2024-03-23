import { IReportReq, IReportResponse, IReportUpdate } from '../../../domain/entities/report';

export interface IReportDataSource {
    create(report: IReportReq): Promise<IReportResponse | null>;
    update(reportId: string, report: IReportUpdate): Promise<IReportResponse | null>;
    getOne(reportId: string): Promise<IReportResponse | null>;
    getAll(): Promise<IReportResponse[] | []>;
}
