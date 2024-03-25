import { Request, Response, NextFunction } from 'express';
import { IMessageController } from '../interface/controllers/message.controller';
import { CreateMessageUseCase, FindAllMessageByConversationIdUseCase } from '../../domain/interface/use-case/message';
import { MarkAsReadUseCase } from '../../domain/interface/use-case/message/mark-as-read.use-case';

export class MessageController implements IMessageController {
    createMessageUseCase: CreateMessageUseCase;
    findAllMessageByConversationIdUseCase: FindAllMessageByConversationIdUseCase;
    markAsReadUseCase: MarkAsReadUseCase;

    constructor(
        createMessageUseCase: CreateMessageUseCase,
        findAllMessageByConversationIdUseCase: FindAllMessageByConversationIdUseCase,
        markAsReadUseCase: MarkAsReadUseCase
    ) {
        this.createMessageUseCase = createMessageUseCase;
        this.findAllMessageByConversationIdUseCase = findAllMessageByConversationIdUseCase;
        this.markAsReadUseCase = markAsReadUseCase;
    }

    async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { cId, userId } = req.body;
        try {
            await this.markAsReadUseCase.execute(cId, userId);
            res.send('ok');
        } catch (error) {
            next(error);
        }
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
