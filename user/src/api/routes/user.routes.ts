import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import {
    CretaeUserUseCase,
    DeleteUserUseCase,
    GetAllUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    LoginUseCase,
    LogoutUseCase,
} from '../../domain/interfaces/use-cases/user/index';
import { body } from 'express-validator';
import { validateRequest } from '@scxsocialcommon/errors';
import { SendResetTokenUseCase } from '../../domain/interfaces/use-cases/token/send-reset-token.use-caes';
import { ResetPasswordUseCase } from '../../domain/interfaces/use-cases/token/reset-password.use-case';

export default function UserRouter(
    createUserUseCase: CretaeUserUseCase,
    deleteUserUseCase: DeleteUserUseCase,
    getAllUserUseCase: GetAllUserUseCase,
    getUserUseCase: GetUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    loginUseCase: LoginUseCase,
    logoutUseCase: LogoutUseCase,
    sendRestTokenUseCase: SendResetTokenUseCase,
    resetPasswordUsecase: ResetPasswordUseCase
) {
    const router = express.Router();
    const userController = new UserController(
        createUserUseCase,
        deleteUserUseCase,
        getAllUserUseCase,
        getUserUseCase,
        updateUserUseCase,
        loginUseCase,
        logoutUseCase,
        sendRestTokenUseCase,
        resetPasswordUsecase
    );

    router.get('/', async (req, res, next) => userController.getAllUser(req, res, next));

    router.post(
        '/',
        [
            body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
            body('email').isEmail().withMessage('Invalid email address'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
            body('fullName').isLength({ min: 1 }).withMessage('Full name is required'),
        ],
        validateRequest,
        async (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res, next)
    );

    router.get('/:id', async (req, res, next) => userController.getUser(req, res, next));

    router.delete('/:id', async (req, res, next) => userController.deleteUser(req, res, next));

    // change the auth check to api gateway
    router.patch(
        '/:id',
        [
            body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
            body('email').isEmail().withMessage('Invalid email address'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
            body('fullName').isLength({ min: 1 }).withMessage('Full name is required'),
        ],
        validateRequest,
        async (req: Request, res: Response, next: NextFunction) => userController.updateUser(req, res, next)
    );

    router.post(
        '/login',
        [
            body('email').isEmail().withMessage('Email must be valid'),
            body('password').trim().notEmpty().withMessage('Password is required'),
        ],
        validateRequest,
        async (req: Request, res: Response, next: NextFunction) => userController.Login(req, res, next)
    );

    router.post('/logout', async (req: Request, res: Response, next: NextFunction) =>
        userController.Logout(req, res, next)
    );

    router.post('/reset-password', async (req: Request, res: Response, next: NextFunction) =>
        userController.sendResetToken(req, res, next)
    );

    router.post('/reset-password/:userId/:token', async (req: Request, res: Response, next: NextFunction) =>
        userController.resetPassword(req, res, next)
    );

    return router;
}
