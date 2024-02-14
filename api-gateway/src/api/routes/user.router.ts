import express from 'express';
import { UserController } from '../controllers/user.controller';

export default function UserRouter() {
    const router = express.Router();

    const userController = new UserController();

    router.post('/login', async (req, res, next) => {
        userController.login(req, res, next);
    });

    router.post('/logout', async (req, res, next) => {
        userController.logout(req, res, next);
    });

    router.get('/currentuser', async (req, res, next) => {
        userController.getCurrentUser(req, res, next);
    });

    router.all('/*', async (req, res, next) => {
        userController.userService(req, res, next);
    });

    return router;
}
