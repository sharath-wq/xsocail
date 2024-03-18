import { IMessage, IMessageReq } from '../../entities/message';

export interface IMessageRepository {
    create(message: IMessageReq): Promise<IMessage | null>;
    findAllMessageByConversationId(conversationId: string): Promise<IMessage[] | []>;
    getLastMessage(cId: string): Promise<IMessage | null>;
}
