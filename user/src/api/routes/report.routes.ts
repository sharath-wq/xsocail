import express from 'express';
import {
    CreateReportUseCase,
    GetAllReportsUseCase,
    GetOneReportsUseCase,
    UpdateReportUseCase,
} from '../../domain/interfaces/use-cases/report';
import { ReportController } from '../controllers/report.controller';

export default function ReportRouter(
    createReportUseCase: CreateReportUseCase,
    getAllReportUseCase: GetAllReportsUseCase,
    getOneReportUseCase: GetOneReportsUseCase,
    updateReportUseCase: UpdateReportUseCase
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
