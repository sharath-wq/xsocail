import { ReportRes } from '../../../entities/report';

export interface GetAllReportsUseCase {
    execute(): Promise<ReportRes[] | []>;
}
