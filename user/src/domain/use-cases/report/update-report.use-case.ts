import { ReportRes, ReportUpdate } from '../../entities/report';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { UpdateReportUseCase } from '../../interfaces/use-cases/report/update-report.use-case';
import { ReportRepository } from '../../repository/report.repository';

export class UpdateReport implements UpdateReportUseCase {
    reportRepository: ReportRepository;
    userRepository: UserRepository;

    constructor(reportRepository: ReportRepository, userRepository: UserRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }
    async execute(reportId: string, report: ReportUpdate): Promise<ReportRes | null> {
        const updatedReport = await this.reportRepository.update(reportId, report);

        if (updatedReport && report.actionTaken === 'Account Blocked') {
            await this.userRepository.updateUser(updatedReport.userId, {
                isBlocked: true,
            });
        }

        return updatedReport;
    }
}
