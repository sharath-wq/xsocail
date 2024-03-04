import { IMessage, IMessageReq } from '../../../entities/message';

export interface FindAllMessageByConversationIdUseCase {
    execute(conversationId: string): Promise<IMessage[] | []>;
}
