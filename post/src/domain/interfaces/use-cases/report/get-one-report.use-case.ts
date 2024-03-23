import { IReportReq, IReportResponse } from '../../../entities/report';

export interface IGetOneReportUseCase {
    execute(reporterId: string): Promise<IReportResponse | null>;
}
