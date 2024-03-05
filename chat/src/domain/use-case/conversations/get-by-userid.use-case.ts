import { IConversations } from '../../entities/conversations';
import { IConversationRepository } from '../../interface/repository/conversation.repository';
import { GetByUserIdUseCase } from '../../interface/use-case/conversation/get-by-userid.use-case';

export class GetByUserId implements GetByUserIdUseCase {
    conversationRepository: IConversationRepository;

    constructor(conversationRepository: IConversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    async execute(userId: string): Promise<IConversations[] | []> {
        return await this.conversationRepository.getConversationByUserId(userId);
    }
}
