import { Request, Response, NextFunction } from 'express';
import { IMessageController } from '../interface/controllers/message.controller';
import { CreateMessageUseCase, FindAllMessageByConversationIdUseCase } from '../../domain/interface/use-case/message';

export class MessageController implements IMessageController {
    createMessageUseCase: CreateMessageUseCase;
    findAllMessageByConversationIdUseCase: FindAllMessageByConversationIdUseCase;

    constructor(
        createMessageUseCase: CreateMessageUseCase,
        findAllMessageByConversationIdUseCase: FindAllMessageByConversationIdUseCase
    ) {
        (this.createMessageUseCase = createMessageUseCase),
            (this.findAllMessageByConversationIdUseCase = findAllMessageByConversationIdUseCase);
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const newMessage = req.body;
        try {
            const message = await this.createMessageUseCase.execute(newMessage);
            res.send(message);
        } catch (error) {
            next(error);
        }
    }

    async getAllMessagesByConversationId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { conversationId } = req.params;
        try {
            const messages = await this.findAllMessageByConversationIdUseCase.execute(conversationId);
            res.send(messages);
        } catch (error) {
            next(error);
        }
    }
}
