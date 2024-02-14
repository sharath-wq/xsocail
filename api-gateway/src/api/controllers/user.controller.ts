import { Request, Response, NextFunction } from 'express';
import { UserControllerInterface } from '../interface/controllers/user.controller';
import axios from 'axios';
import { USER_SERVICE_ENDPOINT } from '../../constants/endpoints';

export class UserController implements UserControllerInterface {
    async userService(req: Request, res: Response, next: NextFunction): Promise<void> {
        const reqBody = req.body;
        const path = req.originalUrl.replace('/api/users', '');

        try {
            if (req.method === 'GET') {
                const response = await axios.get(`${USER_SERVICE_ENDPOINT}${path}`);
                res.status(response.status).send(response.data);
            } else if (req.method === 'POST') {
                const response = await axios.post(`${USER_SERVICE_ENDPOINT}${path}`, { ...req.body });
                res.status(response.status).send(response.data);
            } else if (req.method === 'PATCH') {
                const response = await axios.patch(`${USER_SERVICE_ENDPOINT}${path}`, { ...req.body });
                res.status(response.status).send(response.data);
            } else if (req.method === 'DELETE') {
                const response = await axios.delete(`${USER_SERVICE_ENDPOINT}${path}`);
                res.status(response.status).send(response.data);
            }
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
