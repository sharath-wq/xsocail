import express from 'express';

import {
    CreateConverstationUseCase,
    GetBySenderAndReceiverIdUseCase,
    GetByUserIdUseCase,
} from '../../domain/interface/use-case/conversation';
import { ConversationController } from '../controllers/conversation.controller';

export default function ConversationRouter(
    createConverstationUseCase: CreateConverstationUseCase,
    getBySenderAndReceiverIdUseCase: GetBySenderAndReceiverIdUseCase,
    getByUserIdUseCase: GetByUserIdUseCase
) {
    const router = express.Router();

    const conversationController = new ConversationController(
        createConverstationUseCase,
        getBySenderAndReceiverIdUseCase,
        getByUserIdUseCase
    );

    router.get('/:firstId/:secondId', async (req, res, next) => {
        conversationController.getConversationByBothIds(req, res, next);
    });

    router.post('/', async (req, res, next) => {
        conversationController.create(req, res, next);
    });

    router.get('/:userId', async (req, res, next) => {
        conversationController.getConversationByUserId(req, res, next);
    });

    return router;
}
