import { Request, Response, NextFunction } from 'express';
import { IPostController } from '../interface/controllers/post.controller';
import axios, { AxiosRequestConfig } from 'axios';
import { POST_SERVICE_ENDPOINT } from '../../constants/endpoints';

export class PostController implements IPostController {
    async postService(req: Request, res: Response, next: NextFunction): Promise<void> {
        const path = req.originalUrl.replace('/api/posts', '');

        try {
            let axiosMethod;
            let axiosConfig: AxiosRequestConfig = {
                headers: req.headers,
            };

            switch (req.method) {
                case 'GET':
                    axiosMethod = axios.get;
                    break;
                case 'POST':
                    axiosMethod = axios.post;
                    break;
                case 'PATCH':
                    axiosMethod = axios.patch;
                    console.log(req.body);
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
                `${POST_SERVICE_ENDPOINT}${path}`,
                req.method === 'GET' ? undefined : { ...req.body },
                axiosConfig
            );
            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error.response.status).send(error.response.data);
        }
    }
}
