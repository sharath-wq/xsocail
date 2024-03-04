import { IConversations } from '../../../entities/conversations';

export interface GetByUserIdUseCase {
    execute(userId: string): Promise<IConversations | null>;
}
