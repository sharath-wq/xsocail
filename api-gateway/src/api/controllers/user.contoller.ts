import { Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { USER_SERVICE_ENDPOINT } from '../endpoints';

import { CreateUserUseCase } from '../../domain/interfaces/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../domain/interfaces/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../../domain/interfaces/use-cases/update-user.use-case';

export const UserController = (
    createUserUseCase: CreateUserUseCase,
    getUserUseCase: GetUserUseCase,
    updateUserUseCase: UpdateUserUseCase
) => {
    const getAllUsers = async (req: Request, res: Response) => {
        try {
            const response = await axios.get(`${USER_SERVICE_ENDPOINT}/users`);
            res.json(response.data);
        } catch (error) {
            handleError(res, error);
        }
    };

    const createUser = async (req: Request, res: Response) => {
        const reqBody = req.body;
        try {
            const response = await axios.post(`${USER_SERVICE_ENDPOINT}/users`, reqBody);
            res.json(response.data);
        } catch (error) {
            handleError(res, error);
        }
    };

    const getUserById = async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
            const response = await axios.get(`${USER_SERVICE_ENDPOINT}/users/${userId}`);
            res.json(response.data);
        } catch (error) {
            handleError(res, error);
        }
    };

    const deleteUser = async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
            const response = await axios.delete(`${USER_SERVICE_ENDPOINT}/users/${userId}`);
            res.json(response.data);
        } catch (error) {
            handleError(res, error);
        }
    };

    const updateUser = async (req: Request, res: Response) => {
        const reqBody = req.body;
        const userId = req.params.id;
        try {
            const response = await axios.patch(`${USER_SERVICE_ENDPOINT}/users/${userId}`, reqBody);
            res.json(response.data);
        } catch (error) {
            handleError(res, error);
        }
    };

    const loginUser = async (req: Request, res: Response) => {
        const reqBody = req.body;

        try {
            const response = await axios.post(`${USER_SERVICE_ENDPOINT}/users/login`, reqBody);

            const existingUser = await getUserUseCase.execute(response.data.user.userId);

            if (!existingUser) {
                const user = await createUserUseCase.execute(response.data.user);

                if (user) {
                    const userJwt = jwt.sign(
                        {
                            userId: user.userId,
                            isAdmin: user.isAdmin,
                            username: user.username,
                        },
                        process.env.JWT_KEY!
                    );

                    req.session = {
                        jwt: userJwt,
                    };
                } else {
                    const newUser = await updateUserUseCase.execute(response.data.user.userId, response.data.user);

                    if (newUser) {
                        const userJwt = jwt.sign(
                            {
                                userId: newUser.userId,
                                isAdmin: newUser.isAdmin,
                                username: newUser.username,
                            },
                            process.env.JWT_KEY!
                        );

                        req.session = {
                            jwt: userJwt,
                        };
                    }
                }
            }

            res.json({ message: 'Login Success' });
        } catch (error) {
            handleError(res, error);
        }
    };

    const logoutUser = async (req: Request, res: Response) => {
        const reqBody = req.body;

        try {
            req.session = null;
            res.send({});
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    };

    const handleError = (res: Response, error: any) => {
        if (axios.isAxiosError(error)) {
            res.status(error.response?.status || 500).json({
                errors: [{ message: error.message, details: error.response?.data }],
            });
        } else {
            console.error('Error forwarding request', error);
            res.status(500).json({ errors: [{ message: 'Internal server error' }] });
        }
    };

    return {
        getAllUsers,
        createUser,
        getUserById,
        deleteUser,
        updateUser,
        loginUser,
        logoutUser,
    };
};
