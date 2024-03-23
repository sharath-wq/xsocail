import { IReportResponse, IReportUpdate } from '../../entities/report';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { IReportRepository } from '../../interfaces/repository/report.repositor';
import { IUpdateReportUseCase } from '../../interfaces/use-cases/report';

export class UpdateReport implements IUpdateReportUseCase {
    reportRepository: IReportRepository;
    postRepository: PostRepository;

    constructor(reportRepository: IReportRepository, postRepository: PostRepository) {
        this.reportRepository = reportRepository;
        this.postRepository = postRepository;
    }

    async execute(reporterId: string, report: IReportUpdate): Promise<IReportResponse | null> {
        const updatedReport = await this.reportRepository.update(reporterId, {
            ...report,
            timestamp: new Date(),
        });

        if (updatedReport && report.actionTaken === 'Post Removed') {
            await this.postRepository.updatePost(updatedReport.postId, {
                isDeleted: true,
            });
        }

        return updatedReport;
    }
}
