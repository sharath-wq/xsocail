import { Request, Response, NextFunction } from 'express';
import { UserControllerInterface } from '../interface/controllers/user.controller';
import axios from 'axios';
import { USER_SERVICE_ENDPOINT } from '../../constants/endpoints';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import jwt from 'jsonwebtoken';
import {
    UpdateUserUseCase,
    CreateUserUseCase,
    GetUserUseCase,
    GetUserByEmailUseCase,
} from '../../domain/interface/use-cases';
import { UserModel, UserRequestModel } from '../../domain/entities/user';
import { GetByUsernameUseCase } from '../../domain/interface/use-cases/get-by-username.use-case';
import { generateRandomPassword } from '../../lib/generate-random-password';

export class UserController implements UserControllerInterface {
    createUserUseCase: CreateUserUseCase;
    getUserUseCase: GetUserUseCase;
    updateUserUseCase: UpdateUserUseCase;
    getByUsernameUseCase: GetByUsernameUseCase;
    getUserByEmailUseCase: GetUserByEmailUseCase;

    constructor(
        createUserUseCase: CreateUserUseCase,
        getUserUseCase: GetUserUseCase,
        updateUserUseCase: UpdateUserUseCase,
        getByUsernameUseCase: GetByUsernameUseCase,
        getUserByEmailUseCase: GetUserByEmailUseCase
    ) {
        this.createUserUseCase = createUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.getUserUseCase = getUserUseCase;
        this.getByUsernameUseCase = getByUsernameUseCase;
        this.getUserByEmailUseCase = getUserByEmailUseCase;
    }

    async createUser(data: UserModel): Promise<UserModel | null> {
        try {
            const user = await this.createUserUseCase.execute(data);
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId: string, data: UserModel): Promise<UserModel | null> {
        try {
            const user = await this.updateUserUseCase.execute(userId, data);
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const path = req.originalUrl.replace('/api/users', '');

        try {
            const response = await axios.post(`${USER_SERVICE_ENDPOINT}${path}`, {
                ...req.body,
            });

            if (response.data.user) {
                const userJwt = jwt.sign(
                    {
                        userId: response.data.user.userId,
                        username: response.data.user.username,
                        isAdmin: response.data.user.isAdmin,
                        imageUrl: response.data.user.imageUrl,
                    },
                    process.env.JWT_KEY!
                );

                req.session = {
                    jwt: userJwt,
                };
            }

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error?.response?.status).send(error.response.data);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            req.session = null;
            res.send({});
        } catch (error: any) {
            res.status(error?.response?.status).send(error.response.data);
        }
    }

    async userService(req: Request, res: Response, next: NextFunction): Promise<void> {
        const path = req.originalUrl.replace('/api/users', '');

        try {
            let axiosMethod;
            switch (req.method) {
                case 'GET':
                    axiosMethod = axios.get;
                    break;
                case 'POST':
                    axiosMethod = axios.post;
                    break;
                case 'PATCH':
                    axiosMethod = axios.patch;
                    break;
                case 'DELETE':
                    axiosMethod = axios.delete;
                    break;
                default:
                    throw new Error('Unsupported HTTP method');
            }

            const response = await axiosMethod(
                `${USER_SERVICE_ENDPOINT}${path}`,
                req.method === 'GET' ? undefined : { ...req.body }
            );
            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error.response.status).send(error.response.data);
        }
    }

    async getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.currentUser) {
                res.send({ currentUser: null });
                return;
            }

            const user = await this.getUserUseCase.execute(req.currentUser.userId);

            if (user) {
                res.send({ currentUser: req.currentUser });
                return;
            }

            res.send({ currentUser: null });
        } catch (error) {
            next(error);
        }
    }

    async googleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const existingUser = await this.getUserByEmailUseCase.execute(req.body.email);

            if (!existingUser) {
                const newUser = await axios.post(USER_SERVICE_ENDPOINT, {
                    ...req.body,
                    password: generateRandomPassword(),
                });

                const userJwt = jwt.sign(
                    {
                        userId: newUser.data.userId,
                        username: newUser.data.username,
                        isAdmin: newUser.data.isAdmin,
                        imageUrl: newUser.data.imageUrl,
                    },
                    process.env.JWT_KEY!
                );

                req.session = {
                    jwt: userJwt,
                };
                res.send({});
            } else {
                const userJwt = jwt.sign(
                    {
                        userId: existingUser.userId,
                        username: existingUser.username,
                        isAdmin: existingUser.isAdmin,
                        imageUrl: existingUser.imageUrl,
                    },
                    process.env.JWT_KEY!
                );

                req.session = {
                    jwt: userJwt,
                };
                res.send({});
            }
        } catch (error: any) {
            res.status(error?.response?.status).send(error?.response?.data);
        }
    }
}
