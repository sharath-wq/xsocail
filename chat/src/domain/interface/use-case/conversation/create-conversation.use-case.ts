import { IConversations } from '../../../entities/conversations';

export interface CreateConverstationUseCase {
    execute(senderId: string, receiverId: string): Promise<IConversations | null>;
}
