import { Request, Response, NextFunction } from 'express';
import { UserControllerInterface } from '../interface/controllers/user.controller';
import axios from 'axios';
import { POST_SERVICE_ENDPOINT, USER_SERVICE_ENDPOINT } from '../../constants/endpoints';
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
import { BadRequestError } from '@scxsocialcommon/errors';

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

    async getReportedUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const path = req.originalUrl.replace('/api/users', '');
        try {
            const { data: userReports } = await axios.get(`${USER_SERVICE_ENDPOINT}/reports`);

            const userIds = userReports.map((report: any) => report.userId);

            const { data: users } = await axios.post(`${USER_SERVICE_ENDPOINT}/batch`, { ids: userIds });

            const combinedData = userReports.map((report: any) => {
                const user = users.find((user: any) => user.id === report.userId);
                return {
                    ...report,
                    imageUrl: user.imageUrl,
                    username: user.username,
                    reportedBy: user.reportedBy,
                };
            });

            res.status(200).send(combinedData);
        } catch (error: any) {
            // Handle errors
            res.status(error?.response?.status || 500).send(error.response.data || 'Internal Server Error');
        }
    }

    async follow(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;
        const { followerId } = req.params;
        try {
            const response = await axios.put(`${USER_SERVICE_ENDPOINT}/follow`, {
                userId: userId,
                followerId: followerId,
            });
            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error?.response?.status).send(error.response.data);
        }
    }

    async unfollow(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;
        const { followerId } = req.params;
        try {
            const response = await axios.put(`${USER_SERVICE_ENDPOINT}/unfollow`, {
                userId: userId,
                followerId: followerId,
            });

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error?.response?.status).send(error.response.data);
        }
    }

    async getSavedPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;
        try {
            const { data } = await axios.get(`${USER_SERVICE_ENDPOINT}/${userId}`);

            const response = await axios.post(`${POST_SERVICE_ENDPOINT}/saved`, {
                postIds: [...data.savedPosts],
            });

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error?.response?.status).send(error.response.data);
        }
    }

    async savePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;
        const path = req.originalUrl.replace('/api/users', '');
        try {
            const response = await axios.put(`${USER_SERVICE_ENDPOINT}${path}`, {
                userId: userId,
            });

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error?.response?.status).send(error.response.data);
        }
    }

    async unsavePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;
        const path = req.originalUrl.replace('/api/users', '');
        try {
            const response = await axios.put(`${USER_SERVICE_ENDPOINT}${path}`, {
                userId: userId,
            });

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error?.response?.status).send(error.response.data);
        }
    }

    async blockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const path = req.originalUrl.replace('/api/users', '');
        try {
            if (req.currentUser!.userId === id) {
                throw new BadRequestError("You can't block yourself");
            }

            const response = await axios.put(`${USER_SERVICE_ENDPOINT}${path}`);

            res.status(response.status).send(response.data);
        } catch (error) {
            next(error);
        }
    }

    async unblockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const path = req.originalUrl.replace('/api/users', '');
        try {
            if (req.currentUser!.userId === id) {
                throw new BadRequestError("You can't unblock Yourself");
            }

            const response = await axios.put(`${USER_SERVICE_ENDPOINT}${path}`);

            res.status(response.status).send(response.data);
        } catch (error) {
            next(error);
        }
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
                        isAdmin: response.data.user.isAdmin,
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
                case 'PUT':
                    axiosMethod = axios.put;
                    break;
                case 'DELETE':
                    axiosMethod = axios.delete;
                    break;
                default:
                    throw new Error('Unsupported HTTP method');
            }

            const response = await axiosMethod(
                `${USER_SERVICE_ENDPOINT}${path}`,
                req.method === 'GET' ? undefined : { ...req.body, currentUser: req.currentUser }
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
                    verified: true,
                });

                const userJwt = jwt.sign(
                    {
                        userId: newUser.data.id,
                        isAdmin: newUser.data.isAdmin,
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
                        isAdmin: existingUser.isAdmin,
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
