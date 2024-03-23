import express from 'express';
import {
    ICreateReportUseCase,
    IGetAllReportUseCase,
    IGetOneReportUseCase,
    IUpdateReportUseCase,
} from '../../domain/interfaces/use-cases/report';
import { ReportController } from '../controllers/reprot.controller';

export default function ReportRouter(
    createReportUseCase: ICreateReportUseCase,
    getAllReportUseCase: IGetAllReportUseCase,
    getOneReportUseCase: IGetOneReportUseCase,
    updateReportUseCase: IUpdateReportUseCase
) {
    const router = express.Router();
    const reportController = new ReportController(
        createReportUseCase,
        getAllReportUseCase,
        getOneReportUseCase,
        updateReportUseCase
    );

    router.get('/', (req, res, next) => {
        reportController.getAll(req, res, next);
    });

    router.get('/:id', (req, res, next) => {
        reportController.getOne(req, res, next);
    });

    router.post('/', (req, res, next) => {
        reportController.create(req, res, next);
    });

    router.patch('/:id', (req, res, next) => {
        reportController.update(req, res, next);
    });

    return router;
}
