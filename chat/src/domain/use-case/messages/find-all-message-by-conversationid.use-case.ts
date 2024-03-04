import { IMessage } from '../../entities/message';
import { IMessageRepository } from '../../interface/repository/message.repository';
import { FindAllMessageByConversationIdUseCase } from '../../interface/use-case/message/find-all-message-by-conversationid.use-case';

export class FindAllMessageByConversationId implements FindAllMessageByConversationIdUseCase {
    messageRepository: IMessageRepository;

    constructor(messageRepository: IMessageRepository) {
        this.messageRepository = messageRepository;
    }

    async execute(conversationId: string): Promise<[] | IMessage[]> {
        return await this.messageRepository.findAllMessageByConversationId(conversationId);
    }
}
