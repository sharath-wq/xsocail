import { Request, Response, NextFunction } from 'express';
import { ReportControllerInterface } from '../interfaces/controllers/report.controller';
import {
    ICreateReportUseCase,
    IGetAllReportUseCase,
    IGetOneReportUseCase,
    IUpdateReportUseCase,
} from '../../domain/interfaces/use-cases/report';

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
        try {
            const report = await this.updateReportUseCase.execute(id, req.body);
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
