import express from 'express';
import { AdminController } from '../controllers/admin.controller';

export default function AdminRouter() {
    const router = express.Router();

    const adminController = new AdminController();

    router.get('/dashboard', (req, res, next) => adminController.dashboard(req, res, next));

    return router;
}
