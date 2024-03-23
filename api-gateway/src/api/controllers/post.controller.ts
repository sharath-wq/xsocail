import { Request, Response, NextFunction } from 'express';
import { IPostController } from '../interface/controllers/post.controller';
import axios, { AxiosRequestConfig } from 'axios';
import { POST_SERVICE_ENDPOINT, USER_SERVICE_ENDPOINT } from '../../constants/endpoints';

export class PostController implements IPostController {
    async getReportedPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const path = req.originalUrl.replace('/api/posts', '');
        try {
            const { data: postReports } = await axios.get(`${POST_SERVICE_ENDPOINT}/reports`);

            const postIds = postReports.map((report: any) => report.postId);

            const { data: posts } = await axios.post(`${POST_SERVICE_ENDPOINT}/batch`, { ids: postIds });

            const combinedData = postReports.map((report: any) => {
                const post = posts.find((post: any) => post.id === report.postId);
                return {
                    ...report,
                    postId: post.id,
                    imageUrls: post.imageUrls,
                    author: post.author,
                    reportedBy: post.reportedBy,
                };
            });

            res.status(200).send(combinedData);
        } catch (error: any) {
            res.status(error?.response?.status || 500).send(error.response.data || 'Internal Server Error');
        }
    }

    async postFeed(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.currentUser!.userId;

        try {
            const { data } = await axios.get(`${USER_SERVICE_ENDPOINT}/${userId}`);

            const userIds = data.following;

            const response = await axios.post(`${POST_SERVICE_ENDPOINT}/feed`, {
                userIds,
                userId: userId,
            });

            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error.response.status).send(error.response.data);
        }
    }

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
