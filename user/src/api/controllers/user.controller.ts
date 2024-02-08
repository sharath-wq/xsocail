import { Request, Response } from 'express';
import {
    CretaeUserUseCase,
    DeleteUserUseCase,
    GetAllUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    LoginUseCase,
    LogoutUseCase,
} from '../../domain/interfaces/use-cases/index';
import { UserRequestModel } from '../../domain/entities/user';
import { UserControllerInterface } from '../interfaces/controllers/user.controller';

export class UserController implements UserControllerInterface {
    createUserUseCase: CretaeUserUseCase;
    deleteUserUseCase: DeleteUserUseCase;
    getAllUserUseCase: GetAllUserUseCase;
    getUserUseCase: GetUserUseCase;
    updateUserUseCase: UpdateUserUseCase;
    loginUseCase: LoginUseCase;
    logoutUseCase: LogoutUseCase;

    constructor(
        cretaeUserUseCase: CretaeUserUseCase,
        deleteUserUseCase: DeleteUserUseCase,
        getAllUserUseCase: GetAllUserUseCase,
        getUserUseCase: GetUserUseCase,
        updateUserUseCase: UpdateUserUseCase,
        loginUseCase: LoginUseCase,
        logoutUseCase: LogoutUseCase
    ) {
        this.createUserUseCase = cretaeUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.getAllUserUseCase = getAllUserUseCase;
        this.getUserUseCase = getUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.loginUseCase = loginUseCase;
        this.logoutUseCase = logoutUseCase;
    }
    async Login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const userJwt = await this.loginUseCase.execute(email, password);

            res.status(200).send({ userJwt });
        } catch (error) {
            throw error;
        }
    }

    async Logout(req: Request, res: Response): Promise<void> {
        try {
            req.session = null;
            res.send({});
        } catch (error) {
            throw error;
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.createUserUseCase.execute(req.body as UserRequestModel);
            res.status(201).send(user);
        } catch (error) {
            throw error;
        }
    }
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await this.deleteUserUseCase.execute(id);
            res.send({ message: 'User Deleted' });
        } catch (error) {
            throw error;
        }
    }
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const { username, email, bio, fullName } = req.body;
            const updatedUser = await this.updateUserUseCase.execute(id, {
                username,
                email,
                bio,
                fullName,
            } as UserRequestModel);
            res.status(200).send(updatedUser);
        } catch (error) {
            throw error;
        }
    }
    async getAllUser(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.getAllUserUseCase.execute();
            res.send(users);
        } catch (error) {
            throw error;
        }
    }
    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const user = await this.getUserUseCase.execute(id);
            res.send(user);
        } catch (error) {
            throw error;
        }
    }
}
