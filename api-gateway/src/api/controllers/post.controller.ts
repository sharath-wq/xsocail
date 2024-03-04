import { Request, Response, NextFunction } from 'express';
import { IPostController } from '../interface/controllers/post.controller';
import axios from 'axios';
import FormData from 'form-data';
import { POST_SERVICE_ENDPOINT } from '../../constants/endpoints';

export class PostController implements IPostController {
    async postService(req: Request, res: Response, next: NextFunction): Promise<void> {
        const path = req.originalUrl.replace('/api/posts', '');
        try {
            const formData = new FormData();

            for (const key in req.body) {
                formData.append(key, req.body[key]);
            }

            const response = await axios.post(`${POST_SERVICE_ENDPOINT}${path}`, formData, {
                headers: {
                    ...req.headers,
                    ...formData.getHeaders(),
                },
            });

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
        }
    }
}
