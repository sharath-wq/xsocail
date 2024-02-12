import express, { Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import {
    CretaeUserUseCase,
    DeleteUserUseCase,
    GetAllUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    LoginUseCase,
    LogoutUseCase,
} from '../../domain/interfaces/use-cases/index';
import { body } from 'express-validator';
import { validateRequest, requireAuth } from '@scxsocialcommon/errors';

export default function UserRouter(
    createUserUseCase: CretaeUserUseCase,
    deleteUserUseCase: DeleteUserUseCase,
    getAllUserUseCase: GetAllUserUseCase,
    getUserUseCase: GetUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    loginUseCase: LoginUseCase,
    logoutUseCase: LogoutUseCase
) {
    const router = express.Router();
    const userController = new UserController(
        createUserUseCase,
        deleteUserUseCase,
        getAllUserUseCase,
        getUserUseCase,
        updateUserUseCase,
        loginUseCase,
        logoutUseCase
    );

    router.get('/', async (req, res) => userController.getAllUser(req, res));

    router.post(
        '/',
        [
            body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
            body('email').isEmail().withMessage('Invalid email address'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
            body('fullName').isLength({ min: 1 }).withMessage('Full name is required'),
        ],
        validateRequest,
        async (req: Request, res: Response) => userController.createUser(req, res)
    );

    router.get('/:id', async (req, res) => userController.getUser(req, res));

    router.delete('/:id', async (req, res) => userController.deleteUser(req, res));

    // change the auth check to api gateway
    router.patch(
        '/:id',
        requireAuth,
        [
            body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
            body('email').isEmail().withMessage('Invalid email address'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
            body('fullName').isLength({ min: 1 }).withMessage('Full name is required'),
        ],
        validateRequest,
        async (req: Request, res: Response) => userController.updateUser(req, res)
    );

    router.post(
        '/login',
        [
            body('email').isEmail().withMessage('Email must be valid'),
            body('password').trim().notEmpty().withMessage('Password is required'),
        ],
        validateRequest,
        async (req: Request, res: Response) => userController.Login(req, res)
    );

    router.post('/logout', async (req: Request, res: Response) => userController.Logout(req, res));

    return router;
}
