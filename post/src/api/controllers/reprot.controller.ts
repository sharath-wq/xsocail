import { Request, Response, NextFunction } from 'express';
import { ReportControllerInterface } from '../interfaces/controllers/report.controller';
import {
    ICreateReportUseCase,
    IGetAllReportUseCase,
    IGetOneReportUseCase,
    IUpdateReportUseCase,
} from '../../domain/interfaces/use-cases/report';
import { IReport, IReportReq, IReportUpdate } from '../../domain/entities/report';
import { NotificationCreatedPublisher } from '../events/pub/notification-created-publisher';
import { natsWrapper } from '../../../nats-wrapper';

export class ReportController implements ReportControllerInterface {
    createReportUseCase: ICreateReportUseCase;
    getAllReportUseCase: IGetAllReportUseCase;
    getOneReportUseCase: IGetOneReportUseCase;
    updateReportUseCase: IUpdateReportUseCase;

    constructor(
        createReportUseCase: ICreateReportUseCase,
        getAllReportUseCase: IGetAllReportUseCase,
        getOneReportUseCase: IGetOneReportUseCase,
        updateReportUseCase: IUpdateReportUseCase
    ) {
        this.createReportUseCase = createReportUseCase;
        this.getAllReportUseCase = getAllReportUseCase;
        this.getOneReportUseCase = getOneReportUseCase;
        this.updateReportUseCase = updateReportUseCase;
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;

        try {
            const report = await this.createReportUseCase.execute({ ...req.body, reporterId: userId });
            res.send(report);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const { actionTaken, postId, reason, reporterId, userId } = req.body;
        const adminId = req.currentUser!.userId;
        try {
            const report = await this.updateReportUseCase.execute(id, {
                actionTaken,
                postId,
                reason,
                reporterId,
            });

            if (report && actionTaken === 'Warning Issued') {
                await new NotificationCreatedPublisher(natsWrapper.client).publish({
                    senderId: adminId,
                    content: `One of your post have been reported with ${report.reason}. If this behavior persists, your post will be removed.`,
                    postId: report.postId,
                    receiverId: userId,
                    type: 'Warning Issued',
                });
            }

            res.send(report);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const report = await this.getOneReportUseCase.execute(id);
            res.send(report);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const reports = await this.getAllReportUseCase.execute();
            res.send(reports);
        } catch (error) {
            next(error);
        }
    }
}
