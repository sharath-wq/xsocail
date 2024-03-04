import { Request, Response, NextFunction } from 'express';
import { IChatController } from '../interface/controllers/chat.controller';
import axios from 'axios';
import { CHAT_SERVICE_ENDPOINT } from '../../constants/endpoints';

export class ChatController implements IChatController {
    async chatService(req: Request, res: Response, next: NextFunction): Promise<void> {
        const path = req.originalUrl.replace('/api/chat', '');

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
                `${CHAT_SERVICE_ENDPOINT}${path}`,
                req.method === 'GET' ? undefined : { ...req.body }
            );
            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error.response.status).send(error.response.data);
        }
    }
}
