import { Listener, Subjects, PostCreatedEvent } from '@scxsocialcommon/event';
import { Message, Stan } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { AddPostUseCase } from '../../../domain/interfaces/use-cases/user';

export class PostCreatedListener extends Listener<PostCreatedEvent> {
    subject: Subjects.PostCreated = Subjects.PostCreated;
    queueGroupName: string = queueGroupName;
    addPostUseCase: AddPostUseCase | undefined;

    constructor(client: Stan, addPostUseCase: AddPostUseCase) {
        super(client);
        this.addPostUseCase = addPostUseCase;
    }

    async onMessage(data: PostCreatedEvent['data'], msg: Message) {
        if (!this.addPostUseCase) {
            console.error('CreateUserUseCase not initialized.');
            msg.ack();
            return;
        }

        try {
            await this.addPostUseCase.execute(data.auhtorId, data.postId);

            msg.ack();
        } catch (error: any) {
            console.error('Error processing UserCreatedEvent:', error.message);
            msg.ack();
        }
    }
}
