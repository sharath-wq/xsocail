import express from 'express';

import { CreateMessageUseCase, FindAllMessageByConversationIdUseCase } from '../../domain/interface/use-case/message';
import { MessageController } from '../controllers/message.controller';
import { MarkAsReadUseCase } from '../../domain/interface/use-case/message/mark-as-read.use-case';

export default function MessageRouter(
    createMessageUseCase: CreateMessageUseCase,
    findAllMessageByConversationIdUseCase: FindAllMessageByConversationIdUseCase,
    markAsReadUseCase: MarkAsReadUseCase
) {
    const router = express.Router();

    const messageController = new MessageController(
        createMessageUseCase,
        findAllMessageByConversationIdUseCase,
        markAsReadUseCase
    );

    router.post('/', async (req, res, next) => {
        messageController.create(req, res, next);
    });

    router.patch('/mark-read', async (req, res, next) => {
        messageController.markAsRead(req, res, next);
    });

    router.get('/:conversationId', async (req, res, next) => {
        messageController.getAllMessagesByConversationId(req, res, next);
    });

    return router;
}
