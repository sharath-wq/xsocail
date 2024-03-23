import { IReportReq, IReportResponse } from '../../../entities/report';

export interface ICreateReportUseCase {
    execute(report: IReportReq): Promise<IReportResponse | null>;
}
