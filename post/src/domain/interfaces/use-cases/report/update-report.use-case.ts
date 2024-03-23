import { IReportResponse, IReportUpdate } from '../../../entities/report';

export interface IUpdateReportUseCase {
    execute(reporterId: string, report: IReportUpdate): Promise<IReportResponse | null>;
}
