import { Request, Response, NextFunction } from 'express';
import { UserControllerInterface } from '../interface/controllers/user.controller';
import axios from 'axios';
import { USER_SERVICE_ENDPOINT } from '../../constants/endpoints';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import jwt from 'jsonwebtoken';

export class UserController implements UserControllerInterface {
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const path = req.originalUrl.replace('/api/users', '');

        try {
            const response = await axios.post(`${USER_SERVICE_ENDPOINT}${path}`, {
                ...req.body,
            });

            if (response.data.user) {
                const userJwt = jwt.sign(
                    {
                        id: response.data.user.userId,
                        username: response.data.user.username,
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

    async logout(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>,
        next: NextFunction
    ): Promise<void> {
        const path = req.originalUrl.replace('/api/users', '');

        try {
            const response = await axios.post(`${USER_SERVICE_ENDPOINT}${path}`);
            req.session = null;
            res.status(response.status).send(response.data);
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
            // Need to impliment the logic to verify the user
            res.send({ currentUser: req.currentUser || null });
        } catch (error) {
            next(error);
        }
    }
}
