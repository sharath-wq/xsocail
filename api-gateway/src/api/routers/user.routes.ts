import express, { Request, Response } from 'express';

export default function UserRouter() {
    const router = express.Router();

    router.get('/', async (req, res) => {
        res.send({ message: 'User Routes' });
    });

    return router;
}
