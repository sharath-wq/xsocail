import { Request, Response, NextFunction } from 'express';
import { IconversationController } from '../interface/controllers/conversation.contrller';
import {
    CreateConverstationUseCase,
    GetBySenderAndReceiverIdUseCase,
    GetByUserIdUseCase,
} from '../../domain/interface/use-case/conversation';

export class ConversationController implements IconversationController {
    createConverstationUseCase: CreateConverstationUseCase;
    getBySenderAndReceiverIdUseCase: GetBySenderAndReceiverIdUseCase;
    getByUserIdUseCase: GetByUserIdUseCase;

    constructor(
        createConverstationUseCase: CreateConverstationUseCase,
        getBySenderAndReceiverIdUseCase: GetBySenderAndReceiverIdUseCase,
        getByUserIdUseCase: GetByUserIdUseCase
    ) {
        this.createConverstationUseCase = createConverstationUseCase;
        this.getBySenderAndReceiverIdUseCase = getBySenderAndReceiverIdUseCase;
        this.getByUserIdUseCase = getByUserIdUseCase;
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { senderId, receiverId } = req.body;
        try {
            const newConversation = await this.createConverstationUseCase.execute(senderId, receiverId);
            res.send(newConversation);
        } catch (error) {
            next(error);
        }
    }

    async getConversationByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;

        try {
            const conversation = await this.getByUserIdUseCase.execute(userId);
            res.send(conversation);
        } catch (error) {
            next(error);
        }
    }

    async getConversationByBothIds(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { firstId, secondId } = req.params;

        try {
            const conversation = await this.getBySenderAndReceiverIdUseCase.execute(firstId, secondId);
            res.send(conversation);
        } catch (error) {
            next(error);
        }
    }
}
