import { IMessageRepository } from '../../interface/repository/message.repository';
import { MarkAsReadUseCase } from '../../interface/use-case/message/mark-as-read.use-case';
import { ConversationReposity } from '../../repository/conversation.repository';

export class MarkAsRead implements MarkAsReadUseCase {
    messageRepository: IMessageRepository;
    conversationReposity: ConversationReposity;

    constructor(messageRepository: IMessageRepository, conversationReposity: ConversationReposity) {
        this.messageRepository = messageRepository;
        this.conversationReposity = conversationReposity;
    }

    async execute(cId: string, userId: string): Promise<void> {
        await this.messageRepository.markAsRead(cId, userId);

        await this.conversationReposity.update(cId, {
            unreadCount: 0,
        });
    }
}
