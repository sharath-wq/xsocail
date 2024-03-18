import { IMessageReq, IMessage } from '../../entities/message';
import { IConversationRepository } from '../../interface/repository/conversation.repository';
import { IMessageRepository } from '../../interface/repository/message.repository';
import { CreateMessageUseCase } from '../../interface/use-case/message/create-message.use-case';

export class CreateMessage implements CreateMessageUseCase {
    messageRepository: IMessageRepository;
    conversationRepository: IConversationRepository;

    constructor(messageRepository: IMessageRepository, conversationRepository: IConversationRepository) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
    }

    async execute(message: IMessageReq): Promise<IMessage | null> {
        await this.conversationRepository.update(message.conversationId, { updatedAt: new Date() });

        return await this.messageRepository.create(message);
    }
}
