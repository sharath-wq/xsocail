import { IMessage, IMessageReq } from '../../../domain/entities/message';

export interface IMessageDataSource {
    create(message: IMessageReq): Promise<IMessage | null>;
    findAllMessagesByConversationId(conversationId: string): Promise<IMessage[] | []>;
    getRecentMessage(cId: string): Promise<IMessage | null>;
}
