import { Request, Response, NextFunction } from 'express';
import { IPostController } from '../interface/controllers/post.controller';
import axios from 'axios';
import FormData from 'form-data';
import { POST_SERVICE_ENDPOINT, POST_SERVICE_INSTANCE } from '../../constants/endpoints';

export class PostController implements IPostController {
    async postService(req: Request, res: Response, next: NextFunction): Promise<void> {
        const path = req.originalUrl.replace('/api/posts', '');

        try {
            // Create a FormData object for multipart/form-data
            const formData = new FormData();

            // Append form fields from req.body
            for (const key in req.body) {
                formData.append(key, req.body[key]);
            }

            // Make the POST request using axios
            const response = await axios.post(`${POST_SERVICE_ENDPOINT}${path}`, formData, {
                headers: {
                    ...req.headers,
                    ...formData.getHeaders(), // Set the correct Content-Type header
                },
            });

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
        }
    }
}
