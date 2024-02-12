import { Request, Response } from 'express';
import axios from 'axios';
import { POST_SERVICE_ENDPOINT } from '../endpoints';

export const PostController = () => {
    const getAllPosts = async (req: Request, res: Response) => {
        try {
            const response = await axios.get(`${POST_SERVICE_ENDPOINT}/posts`);
            res.json(response.data);
        } catch (error) {
            throw error;
        }
    };

    const createPost = async (req: Request, res: Response) => {
        const payload: any = {
            reqBody: req.body,
            currentUser: req.currentUser,
        };

        try {
            const response = await axios.post(`${POST_SERVICE_ENDPOINT}/posts`, payload);

            res.json(response.data);
        } catch (error) {
            console.log(error);
            handleError(res, error);
        }
    };

    const getPostsByUser = async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
            const response = await axios.get(`${POST_SERVICE_ENDPOINT}/posts/${userId}`);
            res.json(response.data);
        } catch (error) {
            handleError(res, error);
        }
    };

    const deletePost = async (req: Request, res: Response) => {
        const postId = req.params.id;
        try {
            const response = await axios.delete(`${POST_SERVICE_ENDPOINT}/posts/${postId}`, req);
            res.json(response.data);
        } catch (error) {
            handleError(res, error);
        }
    };

    const updatePost = async (req: Request, res: Response) => {
        const postId = req.params.id;
        const payload: any = {
            reqBody: req.body,
            currentUser: req.currentUser,
        };
        try {
            const response = await axios.patch(`${POST_SERVICE_ENDPOINT}/posts/${postId}`, payload);
            res.json(response.data);
        } catch (error) {
            handleError(res, error);
        }
    };

    const getOnePost = async (req: Request, res: Response) => {
        const postId = req.params.id;
        try {
            const response = await axios.patch(`${POST_SERVICE_ENDPOINT}/posts/${postId}`, req);
            res.json(response.data);
        } catch (error) {
            handleError(res, error);
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
        createPost,
        updatePost,
        deletePost,
        getAllPosts,
        getPostsByUser,
        getOnePost,
    };
};
