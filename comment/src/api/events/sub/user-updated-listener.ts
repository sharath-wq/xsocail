import { Listener, Subjects, UserUpdatedEvent } from '@scxsocialcommon/event';
import { Message, Stan } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { FindByUserIdAndUpdateUseCase } from '../../../domain/interface/use-case';

export class UserUpdatedListener extends Listener<UserUpdatedEvent> {
    subject: Subjects.UserUpdated = Subjects.UserUpdated;
    queueGroupName: string = queueGroupName;
    findByUserIdAndUpdateUseCase: FindByUserIdAndUpdateUseCase | undefined;

    constructor(client: Stan, findByUserIdAndUpdateUseCase: FindByUserIdAndUpdateUseCase) {
        super(client);
        this.findByUserIdAndUpdateUseCase = findByUserIdAndUpdateUseCase;
    }

    async onMessage(data: UserUpdatedEvent['data'], msg: Message) {
        if (!this.findByUserIdAndUpdateUseCase) {
            console.error('CreateUserUseCase not initialized.');
            msg.ack();
            return;
        }

        try {
            await this.findByUserIdAndUpdateUseCase.execute(data.userId, {
                author: {
                    imageUrl: data.imageUrl,
                    userId: data.userId,
                    username: data.username,
                },
            });

            msg.ack();
        } catch (error: any) {
            console.error('Error processing UserCreatedEvent:', error.message);
            msg.ack();
        }
    }
}
