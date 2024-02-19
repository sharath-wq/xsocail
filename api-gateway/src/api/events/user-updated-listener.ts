import { Listener, Subjects, UserCreatedEvent, UserUpdatedEvent } from '@scxsocialcommon/event';
import { Message, Stan } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { UpdateUserUseCase } from '../../domain/interface/use-cases';

export class UserUpdatedListener extends Listener<UserUpdatedEvent> {
    subject: Subjects.UserUpdated = Subjects.UserUpdated;
    queueGroupName: string = queueGroupName;
    updateUserUseCase: UpdateUserUseCase | undefined;

    constructor(client: Stan, updateUserUseCase: UpdateUserUseCase) {
        super(client);
        this.updateUserUseCase = updateUserUseCase;
    }

    async onMessage(data: UserUpdatedEvent['data'], msg: Message) {
        if (!this.updateUserUseCase) {
            console.error('CreateUserUseCase not initialized.');
            msg.ack();
            return;
        }

        try {
            const user = await this.updateUserUseCase.execute(data.userId, data);

            if (user) {
                msg.ack();
            }
        } catch (error: any) {
            console.error('Error processing UserCreatedEvent:', error.message);
            msg.ack();
        }
    }
}
