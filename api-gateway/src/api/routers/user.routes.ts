import express from 'express';
import { CreateUserUseCase } from '../../domain/interfaces/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../domain/interfaces/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../../domain/interfaces/use-cases/update-user.use-case';
import { UserController } from '../controllers/user.contoller';

import { currentUser, requireAuth } from '@scxsocialcommon/errors';

export default function UserRouter(
    createUserUseCase: CreateUserUseCase,
    getUserUseCase: GetUserUseCase,
    updateUserUseCase: UpdateUserUseCase
) {
    const router = express.Router();
    const userController = UserController(createUserUseCase, getUserUseCase, updateUserUseCase);

    router.get('/', userController.getAllUsers);
    router.post('/', userController.createUser);
    router.delete('/:id', requireAuth, userController.deleteUser);
    router.patch('/:id', requireAuth, userController.updateUser);
    router.post('/login', userController.loginUser);
    router.post('/logout', requireAuth, userController.logoutUser);
    router.get('/currentuser', currentUser, userController.currentUser);
    router.get('/:id', userController.getUserById);

    return router;
}
