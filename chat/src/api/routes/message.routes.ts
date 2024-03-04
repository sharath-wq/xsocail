import express from 'express';

import { CreateMessageUseCase, FindAllMessageByConversationIdUseCase } from '../../domain/interface/use-case/message';
import { MessageController } from '../controllers/message.controller';

export default function MessageRouter(
    createMessageUseCase: CreateMessageUseCase,
    findAllMessageByConversationIdUseCase: FindAllMessageByConversationIdUseCase
) {
    const router = express.Router();

    const messageController = new MessageController(createMessageUseCase, findAllMessageByConversationIdUseCase);

    router.post('/', async (req, res, next) => {
        messageController.create(req, res, next);
    });

    router.get('/:conversationId', async (req, res, next) => {
        messageController.getAllMessagesByConversationId(req, res, next);
    });

    return router;
}
