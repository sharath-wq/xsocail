import { IMessageReq, IMessage } from '../../entities/message';
import { IMessageRepository } from '../../interface/repository/message.repository';
import { CreateMessageUseCase } from '../../interface/use-case/message/create-message.use-case';

export class CreateMessage implements CreateMessageUseCase {
    messageRepository: IMessageRepository;

    constructor(messageRepository: IMessageRepository) {
        this.messageRepository = messageRepository;
    }

    async execute(message: IMessageReq): Promise<IMessage | null> {
        return await this.messageRepository.create(message);
    }
}
