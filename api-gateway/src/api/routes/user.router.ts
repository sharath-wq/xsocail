import express from 'express';
import { UserController } from '../controllers/user.controller';
import { CreateUserUseCase, UpdateUserUseCase, GetUserUseCase } from '../../domain/interface/use-cases';

export default function UserRouter(
    createUserUseCase: CreateUserUseCase,
    getUserUseCase: GetUserUseCase,
    updateUserUseCase: UpdateUserUseCase
) {
    const router = express.Router();

    const userController = new UserController(createUserUseCase, getUserUseCase, updateUserUseCase);

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
