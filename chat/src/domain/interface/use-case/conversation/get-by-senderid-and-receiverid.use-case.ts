import { IConversations } from '../../../entities/conversations';

export interface GetBySenderAndReceiverIdUseCase {
    execute(firstId: string, secondId: string): Promise<IConversations | null>;
}
