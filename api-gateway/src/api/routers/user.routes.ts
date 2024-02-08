import express, { Request, Response } from 'express';
import axios from 'axios';
import { USER_SERVICE_ENDPOINT } from '../endpoints';

export default function UserRouter() {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        try {
            const response = await axios.get(`${USER_SERVICE_ENDPOINT}/users`);
            res.json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return res.status(error.response?.status || 500).json({
                    errors: [{ message: error.message, details: error.response?.data }],
                });
            } else {
                console.error('Error forwarding request', error);
                res.status(500).json({ errors: [{ message: 'Internal server error' }] });
            }
        }
    });

    router.post('/', async (req: Request, res: Response) => {
        const reqBody = req.body;
        try {
            const response = await axios.post(`${USER_SERVICE_ENDPOINT}/users`, reqBody);
            res.json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return res.status(error.response?.status || 500).json({
                    errors: [{ message: error.message, details: error.response?.data }],
                });
            } else {
                console.error('Error forwarding request', error);
                res.status(500).json({ errors: [{ message: 'Internal server error' }] });
            }
        }
    });

    router.get('/:id', async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
            const response = await axios.get(`${USER_SERVICE_ENDPOINT}/users/${userId}`);
            res.json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return res.status(error.response?.status || 500).json({
                    errors: [{ message: error.message, details: error.response?.data }],
                });
            } else {
                console.error('Error forwarding request', error);
                res.status(500).json({ errors: [{ message: 'Internal server error' }] });
            }
        }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
            const response = await axios.delete(`${USER_SERVICE_ENDPOINT}/users/${userId}`);
            res.json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return res.status(error.response?.status || 500).json({
                    errors: [{ message: error.message, details: error.response?.data }],
                });
            } else {
                console.error('Error forwarding request', error);
                res.status(500).json({ errors: [{ message: 'Internal server error' }] });
            }
        }
    });

    router.patch('/:id', async (req: Request, res: Response) => {
        const reqBody = req.body;
        const userId = req.params.id;
        try {
            const response = await axios.patch(`${USER_SERVICE_ENDPOINT}/users/${userId}`, reqBody);
            res.json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return res.status(error.response?.status || 500).json({
                    errors: [{ message: error.message, details: error.response?.data }],
                });
            } else {
                console.error('Error forwarding request', error);
                res.status(500).json({ errors: [{ message: 'Internal server error' }] });
            }
        }
    });

    router.post('/login', async (req: Request, res: Response) => {
        const reqBody = req.body;

        try {
            const response = await axios.post(`${USER_SERVICE_ENDPOINT}/users/login`, reqBody);
            res.json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return res.status(error.response?.status || 500).json({
                    errors: [{ message: error.message, details: error.response?.data }],
                });
            } else {
                console.error('Error forwarding request', error);
                res.status(500).json({ errors: [{ message: 'Internal server error' }] });
            }
        }
    });

    router.post('/logout', async (req: Request, res: Response) => {
        const reqBody = req.body;

        try {
            const response = await axios.post(`${USER_SERVICE_ENDPOINT}/users/logout`, reqBody);
            res.json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return res.status(error.response?.status || 500).json({
                    errors: [{ message: error.message, details: error.response?.data }],
                });
            } else {
                console.error('Error forwarding request', error);
                res.status(500).json({ errors: [{ message: 'Internal server error' }] });
            }
        }
    });

    return router;
}
