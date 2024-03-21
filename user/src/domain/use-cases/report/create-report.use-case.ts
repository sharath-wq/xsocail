import { ReportReq, ReportRes } from '../../entities/report';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { CreateReportUseCase } from '../../interfaces/use-cases/report/create-report.use-case';
import { ReportRepository } from '../../repository/report.repository';

export class CreateReport implements CreateReportUseCase {
    reportRepository: ReportRepository;
    userRepository: UserRepository;

    constructor(reportRepository: ReportRepository, userRepository: UserRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }

    async execute(report: ReportReq): Promise<ReportRes | null> {
        const user = await this.userRepository.getUser(report.userId);

        if (user) {
            await this.userRepository.updateUser(user.id, {
                ...user,
                reportedBy: [...user.reportedBy, report.reporterId],
            });
        }
        return await this.reportRepository.create(report);
    }
}
