import { Listener, Subjects, UserUpdatedEvent } from '@scxsocialcommon/event';
import { Message, Stan } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { UpdatePostsByUserIdUseCase } from '../../../domain/interfaces/use-cases/posts';

export class UserUpdatedListener extends Listener<UserUpdatedEvent> {
    subject: Subjects.UserUpdated = Subjects.UserUpdated;
    queueGroupName: string = queueGroupName;
    updatePostsByUserIdUseCase: UpdatePostsByUserIdUseCase | undefined;

    constructor(client: Stan, updatePostsByUserIdUseCase: UpdatePostsByUserIdUseCase) {
        super(client);
        this.updatePostsByUserIdUseCase = updatePostsByUserIdUseCase;
    }

    async onMessage(data: UserUpdatedEvent['data'], msg: Message) {
        if (!this.updatePostsByUserIdUseCase) {
            console.error('CreateUserUseCase not initialized.');
            msg.ack();
            return;
        }

        try {
            await this.updatePostsByUserIdUseCase.execute(data.userId, {
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
