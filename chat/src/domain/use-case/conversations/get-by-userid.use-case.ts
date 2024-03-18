import { IConversations } from '../../entities/conversations';
import { IConversationRepository } from '../../interface/repository/conversation.repository';
import { IMessageRepository } from '../../interface/repository/message.repository';
import { GetByUserIdUseCase } from '../../interface/use-case/conversation/get-by-userid.use-case';

export class GetByUserId implements GetByUserIdUseCase {
    conversationRepository: IConversationRepository;
    messageRepository: IMessageRepository;

    constructor(conversationRepository: IConversationRepository, messageRepository: IMessageRepository) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    async execute(userId: string): Promise<IConversations[] | []> {
        const conversations = await this.conversationRepository.getConversationByUserId(userId);

        for (const conversation of conversations) {
            const message = await this.messageRepository.getLastMessage(conversation.id);
            conversation.recentMessage = message?.text;
        }

        return conversations;
    }
}
