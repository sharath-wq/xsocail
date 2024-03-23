import { Request, Response, NextFunction } from 'express';
import { ReportControllerInterface } from '../interfaces/controllers/report.controller';
import {
    CreateReportUseCase,
    GetAllReportsUseCase,
    GetOneReportsUseCase,
    UpdateReportUseCase,
} from '../../domain/interfaces/use-cases/report';
import { NotificationCreatedPublisher } from '../events/pub/notification-created-publisher';
import { natsWrapper } from '../../../nats-wrapper';

export class ReportController implements ReportControllerInterface {
    createReportUseCase: CreateReportUseCase;
    getAllReportUseCase: GetAllReportsUseCase;
    getOneReportUseCase: GetOneReportsUseCase;
    updateReportUseCase: UpdateReportUseCase;

    constructor(
        createReportUseCase: CreateReportUseCase,
        getAllReportUseCase: GetAllReportsUseCase,
        getOneReportUseCase: GetOneReportsUseCase,
        updateReportUseCase: UpdateReportUseCase
    ) {
        this.createReportUseCase = createReportUseCase;
        this.getAllReportUseCase = getAllReportUseCase;
        this.getOneReportUseCase = getOneReportUseCase;
        this.updateReportUseCase = updateReportUseCase;
    }
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const report = await this.createReportUseCase.execute({
                ...req.body,
            });

            res.send(report);
        } catch (error) {
            next(error);
        }
    }
    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const userId = req.body.currentUser.userId;

        try {
            const report = await this.updateReportUseCase.execute(id, {
                ...req.body,
            });

            if (report && req.body.actionTaken === 'Warning Issued') {
                await new NotificationCreatedPublisher(natsWrapper.client).publish({
                    senderId: userId,
                    receiverId: report.userId,
                    type: 'Warning',
                    content: `You have been reported with ${report.reason}. If this behavior persists, your account will be blocked.`,
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
