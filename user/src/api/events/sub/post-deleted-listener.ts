import { Listener, Subjects, PostCreatedEvent, PostDeletedEvent } from '@scxsocialcommon/event';
import { Message, Stan } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { DeletePostUseCase } from '../../../domain/interfaces/use-cases/user';

export class PostDeletedListener extends Listener<PostDeletedEvent> {
    subject: Subjects.PostDeleted = Subjects.PostDeleted;
    queueGroupName: string = queueGroupName;
    deletePostUseCase: DeletePostUseCase | undefined;

    constructor(client: Stan, deletePostUseCase: DeletePostUseCase) {
        super(client);
        this.deletePostUseCase = deletePostUseCase;
    }

    async onMessage(data: PostDeletedEvent['data'], msg: Message) {
        if (!this.deletePostUseCase) {
            console.error('Delete post usecase not initialized.');
            msg.ack();
            return;
        }

        try {
            await this.deletePostUseCase.execute(data.auhtorId, data.postId);

            msg.ack();
        } catch (error: any) {
            console.error('Error processing Post Deleted event:', error.message);
            msg.ack();
        }
    }
}
