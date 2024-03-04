import express from 'express';
import { ChatController } from '../controllers/chat.controller';

export default function ChatRouter() {
    const router = express.Router();

    const chatController = new ChatController();

    router.all('/*', async (req, res, next) => {
        chatController.chatService(req, res, next);
    });

    return router;
}
