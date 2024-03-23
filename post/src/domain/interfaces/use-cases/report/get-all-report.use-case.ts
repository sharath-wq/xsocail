import { IReportReq, IReportResponse } from '../../../entities/report';

export interface IGetAllReportUseCase {
    execute(): Promise<IReportResponse[] | []>;
}
