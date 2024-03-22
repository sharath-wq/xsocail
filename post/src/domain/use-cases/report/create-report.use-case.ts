import { IReportReq, IReportResponse } from '../../entities/report';
import { PostRepository } from '../../interfaces/repository/post.repository';
import { IReportRepository } from '../../interfaces/repository/report.repositor';
import { ICreateReportUseCase } from '../../interfaces/use-cases/report';

export class CreateReport implements ICreateReportUseCase {
    reportRepository: IReportRepository;
    postRepository: PostRepository;

    constructor(reportRepository: IReportRepository, postRepository: PostRepository) {
        this.reportRepository = reportRepository;
        this.postRepository = postRepository;
    }

    async execute(report: IReportReq): Promise<IReportResponse | null> {
        const post = await this.postRepository.getOnePost(report.postId);

        if (post) {
            await this.postRepository.updatePost(post.id, {
                ...post,
                reportedBy: [...post.reportedBy, report.reporterId],
                actionTaken: 'Pending',
            });
        }

        return await this.reportRepository.create(report);
    }
}
