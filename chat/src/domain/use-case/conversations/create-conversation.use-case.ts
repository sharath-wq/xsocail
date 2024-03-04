import { IConversations } from '../../entities/conversations';
import { IConversationRepository } from '../../interface/repository/conversation.repository';
import { CreateConverstationUseCase } from '../../interface/use-case/conversation/create-conversation.use-case';

export class CreateConversation implements CreateConverstationUseCase {
    conversationRepository: IConversationRepository;

    constructor(conversationRepository: IConversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    async execute(senderId: string, receiverId: string): Promise<IConversations | null> {
        return await this.conversationRepository.create(senderId, receiverId);
    }
}
