import { IMessage, IMessageReq } from '../../../entities/message';

export interface CreateMessageUseCase {
    execute(message: IMessageReq): Promise<IMessage | null>;
}
