import { Listener, Subjects, UserCreatedEvent } from '@scxsocialcommon/event';
import { Message, Stan } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

import { CreateUserUseCase } from '../../domain/interface/use-cases';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
    queueGroupName: string = queueGroupName;
    createUserUseCase: CreateUserUseCase | undefined;

    constructor(client: Stan, createUserUseCase: CreateUserUseCase) {
        super(client);
        this.createUserUseCase = createUserUseCase;
    }

    async onMessage(data: UserCreatedEvent['data'], msg: Message) {
        if (!this.createUserUseCase) {
            console.error('CreateUserUseCase not initialized.');
            msg.ack();
            return;
        }

        try {
            const user = await this.createUserUseCase.execute(data);

            if (user) {
                msg.ack();
            }
        } catch (error: any) {
            console.error('Error processing UserCreatedEvent:', error.message);
            msg.ack();
        }
    }
}
